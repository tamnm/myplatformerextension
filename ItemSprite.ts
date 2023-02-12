namespace PlatformerItems {
    //export class PlatformerSprite extends Sprite {
    export type ItemHandle = (item:Item)=>void
    export type Effect={
        effect_type:number
        frames:Image[]
        interval:number
        cooldown:number
        event:{
            afterTriggers: ItemHandle[]

        }
    }

    export enum EffectEvent{
        //% block="after trigger"
        AfterTrigger,
        //% block="after cooldown end"
        AfterCooldownEnd
    }

    let onEffectItems: Item[]

    function init() {
        if (onEffectItems != undefined)
            return;

        onEffectItems = []

        game.currentScene().eventContext.registerFrameHandler(scene.ANIMATION_UPDATE_PRIORITY, update);
    }

    function update() {
        let stillOnEffItems: Item[] = [];

        const dt = game.currentScene().eventContext.deltaTimeMillis;
        onEffectItems
        .filter(item=>!item.isDestroyed())
        .forEach(item => {
            updateEffect(item, dt)
            updatePosition(item)
            stillOnEffItems.push(item)
        })

        onEffectItems = stillOnEffItems
    }

    function updatePosition(item:Item): void { 
        item.updateDirectionAndPosition()
    }

    function updateEffect(item:Item, deltaTimeMillis:number) : void{
        if(!item.isOnEffect())
            return

        let remain = item.remainCooldown
        remain -= deltaTimeMillis
        item.remainCooldown = remain

        if (remain <= 0) {
            item.clearEffect()
        }
    }



    /**
     * Create a item from an image
     */
    //% blockId=platformer_extensions_create_item
    //% block="Create Item %img=screen_image_picker of kind %kind=spritekind"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=myItem
    //% group="Items"
    //% weight=100
    export function createItem(img: Image, kind: number): Item {
        init()
        
        let item = new Item(img)

        const scene = game.currentScene();
        item.setKind(kind);
        scene.physicsEngine.addSprite(item);

        // run on created handlers
        scene.createdHandlers
            .filter(h => h.kind == kind)
            .forEach(h => h.handler(item));

        return item
    }


    /**
     * Create a item eff
     */
    //% blockId=platformer_extensions_create_item_effect
    //% block="Create effect $effect_type Frames $frames Frame Interval(ms) $interval Cooldown (ms) $cooldown"
    //% inlineInputMode=inline
    //% effect_type.shadow=effecttype
    //% frames.shadow=animation_editor
    //% interval.shadow=timePicker
    //% cooldown.shadow=timePicker
    //% weight=40
    //% group="Items"
    export function createItemEffect(
        effect_type: number,
        frames: Image[],
        interval: number,
        cooldown: number): Effect {
        return { effect_type, frames, interval, cooldown, event: { afterTriggers: [] } }
    }
 
    //% blockId=platformer_extensions_sprite_as_item
    //% block="$sprite=variables_get(mySprite) as a Item"
    //group="Items"
    export function asItem(sprite:Sprite) : Item { 
        return sprite as Item
    }

    //% blockId=platformer_extensions_get_held_item
    //% block="item from Sprite $sprite=variables_get(mySprite)"
    //group="Items"
    export function getHeldItem(sprite: Sprite): Item {
        return sprite.data["item"]
    }

    //% blockId=platformer_extensions_get_is_holding_item
    //% block="$sprite=variables_get(mySprite) is holding an item"
    //group="Items"
    export function isHoldingItem(sprite: Sprite): boolean{
        return sprite.data["item"] instanceof Item
    }

    export class Item extends Sprite {
        direction:-1|1=1
        originalImage:Image
        offset: {x:number,y:number}
        owner:Sprite
        effects: Effect[]
        remainCooldown: number
        currentEffect:Effect = null

        constructor(img:Image){
            super(img)
            this.effects = []
            this.originalImage = img
        }

        isDestroyed():boolean {
            if(this.flags & sprites.Flag.Destroyed)
                return true
            return false
        }

        //% blockId=platformer_extensions_item_get_isPickable
        //% block="get $this(myItem) isPickable"
        //% group="Items"
        isPickable(): boolean {
            return this.owner = undefined
        }

        //% blockId=platformer_extensions_item_get_direction
        //% block="get $this(myItem) direction"
        //% group="Items"
        getDirection():number {
            return this.direction
        }

        //% blockId=platformer_extensions_item_add_effect
        //% block="Add effect $this(myItem) $effect"
        //% group="Items"
        addEffect(effect:Effect):void{
            this.effects[effect.effect_type] = effect
        }

        //% blockId=platformer_extensions_item_add_effect_event_handler
        //% block="Add $this(myItem) effect $effect_type event $event Handler"
        //% effect_type.shadow=effecttype
        //% event.defl=EffectEvent.AfterTrigger
        //% handlerStatement=1
        //% draggableParameters = "reporter"
        //% group="Items"
        addEffectEventHandler(effect_type:number, event:EffectEvent, handler:(item: Item)=>void):void{
            let eff = this.effects[effect_type]
            if (!eff) throw "Effect was not found: " + effect_type

            switch (event) {
                case EffectEvent.AfterTrigger:
                    eff.event.afterTriggers.push(handler)
            }
        }

        isOnEffect(): boolean {
            return this.currentEffect != null
        }

        //% blockId=platformer_extensions_item_active_effect
        //% block="Active $this(myItem) Effect $effect_type"
        //% effect_type.shadow=effecttype
        //% group="Items"
        activateEffect(effect_type:number): void {
            const eff = this.effects[effect_type]
            if (!eff) throw "Effect was not found:" + effect_type

            // skip if still in effect
            if(this.currentEffect) return;

            this.currentEffect = eff
            this.remainCooldown =  eff.cooldown


            animation.runImageAnimation(this, eff.frames, eff.interval, false)
            
            eff.event.afterTriggers.forEach(handler => handler(this))
        }

        //% blockId=platformer_extensions_item_clear_effect
        //% block="Clear $this(myItem) Effect"
        //% group="Items"
        clearEffect(): void{
            this.currentEffect = null
            this.remainCooldown = 0
            this.setImage(this.originalImage)
        }

        //% blockId=platformer_extensions_item_attach_sprite
        //% block="Attach $this(myItem) to $ownerSprite=variables_get(mySprite) | x offset  $offset_x| y offset $offset_y"
        //% group="Items"
        attachToSprice(ownerSprite:Sprite, offset_x:number=0, offset_y:number=0):void {
            
            if(this.owner && this.owner != ownerSprite) throw "This item already held by another"
            if(this.owner && this.owner == ownerSprite) return

            onEffectItems.push(this)

            if(ownerSprite.data["item"]) {
                let item:Item = ownerSprite.data["item"]
                item.detach()
            }

            this.owner = ownerSprite
            this.owner.data["item"] = this
            this.offset = {x:offset_x, y:offset_y}
        }

        detach():void  {
            this.owner.data["item"] = undefined
            this.owner = undefined
            this.offset = undefined
            this.destroy()
            onEffectItems.removeElement(this)
        }

        updateDirectionAndPosition():void{
            if(this.direction*this.owner.vx <0 ){
                this.direction*=-1
                if(this.image) {
                    let img = this.image.clone()
                    img.flipX()
                    this.setImage(img)
                }
                this.effects.forEach(e=>{
                    if(e){
                        this.flip(e)
                    }
                })
                this.offset.x *=-1
                this.offset.y *=-1
            }
            this.setPosition(this.owner.x + this.offset.x, this.owner.y + this.offset.y)
        }

        private flip(eff:Effect):void {
            eff.frames.forEach(img=>img.flipX())
        }
    }
}