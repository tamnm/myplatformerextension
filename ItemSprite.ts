namespace PlatformerItems {
    //export class PlatformerSprite extends Sprite {
    export type ItemHandle = (item:Item)=>void
    export type Effect={
        name:string
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

        let item = new Item(img, kind)
        onEffectItems.push(item)
        return item
    }


    /**
     * Create a item eff
     */
    //% blockId=platformer_extensions_create_item_effect
    //% block="Create effect $name Frames $frames Frame Interval(ms) $interval Cooldown (ms) $cooldown"
    //% inlineInputMode=inline
    //% name.shadow=sprite_effect_names
    //% frames.shadow=animation_editor
    //% interval.shadow=timePicker
    //% cooldown.shadow=timePicker
    //% weight=40
    //% group="Items"
    export function createItemEffect(
        name: string,
        frames: Image[],
        interval: number,
        cooldown: number): Effect {
        return { name, frames, interval, cooldown, event: { afterTriggers: [] } }
    }

    export class Item {
        sprite: Sprite
        direction:-1|1=1
        originalImage:Image
        offset: {x:number,y:number}
        owner:Sprite
        effects: {[index:string]:Effect}
        remainCooldown: number
        currentEffect:Effect = null

        constructor(img:Image, kind:number){
            this.sprite = sprites.create(img, kind)
            this.effects = {}
            this.originalImage = img
        }

        isDestroyed():boolean {
            if(this.sprite.flags & sprites.Flag.Destroyed)
                return true
            return false
        }

        //% blockId=platformer_extensions_item_get_isPickable
        //% block="get $this(myItem) isPickable"
        //% group="Items"
        isPickable(): boolean {
            return this.owner = undefined
        }

        //% blockId=platformer_extensions_item_get_sprite
        //% block="get $this(myItem) sprite"
        //% group="Items"
        getSprite () :Sprite {
            return this.sprite
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
            this.effects[effect.name] = effect
        }

        //% blockId=platformer_extensions_item_add_effect_event_handler
        //% block="Add $this(myItem) effect $effectName event $event Handler"
        //% event.defl=EffectEvent.AfterTrigger
        //% handlerStatement=1
        //% draggableParameters = "reporter"
        //% group="Items"
        addEffectEventHandler(effectName:string, event:EffectEvent, handler:(item: Item)=>void):void{
            let eff = this.effects[effectName]
            if(!eff) throw "Effect was not found: "+ effectName

            switch (event) {
                case EffectEvent.AfterTrigger:
                    eff.event.afterTriggers.push(handler)
            }
        }

        isOnEffect(): boolean {
            return this.currentEffect != null
        }

        //% blockId=platformer_extensions_item_active_effect
        //% block="Active $this(myItem) Effect $effectName"
        //% group="Items"
        activateEffect(effectName:string): void {
            const eff = this.effects[effectName]
            if(!eff) throw "Effect was not found:" + effectName

            // skip if still in effect
            if(this.currentEffect) return;

            this.currentEffect = eff
            this.remainCooldown =  eff.cooldown


            animation.runImageAnimation(this.sprite, eff.frames, eff.interval, false)
            
            eff.event.afterTriggers.forEach(handler => handler(this))
        }

        //% blockId=platformer_extensions_item_clear_effect
        //% block="Clear $this(myItem) Effect"
        //% group="Items"
        clearEffect(): void{
            this.currentEffect = null
            this.remainCooldown = 0
            this.sprite.setImage(this.originalImage)
        }

        //% blockId=platformer_extensions_item_attach_sprite
        //% block="Attach $this(myItem) to $ownerSprite=variables_get(mySprite) | x offset  $offset_x| y offset $offset_y"
        //% group="Items"
        attachToSprice(ownerSprite:Sprite, offset_x:number=0, offset_y:number=0):void {
            this.owner = ownerSprite
            this.offset = {x:offset_x, y:offset_y}
        }

        updateDirectionAndPosition():void{
            if(this.direction*this.owner.vx <0 ){
                this.direction*=-1
                if(this.sprite.image) {
                    let img = this.sprite.image.clone()
                    img.flipX()
                    this.sprite.setImage(img)
                }
                Object.keys(this.effects).forEach(k => this.flip(this.effects[k]))
                this.offset.x *=-1
                this.offset.y *=-1
            }
            this.sprite.setPosition(this.owner.x + this.offset.x, this.owner.y + this.offset.y)
        }

        private flip(eff:Effect):void {
            eff.frames.forEach(img=>img.flipX())
        }
    }


    //% blockId=sprite_effect_names block="%eff_name"
    //% eff_name.fieldEditor="autocomplete"
    //% eff_name.fieldOptions.decompileLiterals=true
    //% eff_name.fieldOptions.key="item_effect_name"
    //% weight=40
    //% group="Items"
    export function _effName(eff_name: string) {
        return eff_name
    }

}