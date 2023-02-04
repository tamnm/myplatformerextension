namespace PlatformerExtensions{
    //export class PlatformerSprite extends Sprite {
    export type ItemHandle = (item:Item)=>void
    export type Effect={
        name:string
        frames:Image[]
        interval:number
        cooldown:number
        event:{
            afterTrigger: ItemHandle
        }
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
        onEffectItems.forEach(item => {
            const actEff = item.currentEffect

            let remain = item.remainCooldown
            remain -= dt
            item.remainCooldown = remain

            if (remain <= 0) {
                item.clearEffect()
            } else {
                stillOnEffItems.push(item)
            }
        })

        onEffectItems = stillOnEffItems
    }

    export class Item {
        sprite: Sprite
        originalImage:Image
        effects: {[index:string]:Effect}
        remainCooldown: number
        currentEffect:Effect

        constructor(img:Image, kind:number){
            this.sprite = sprites.create(img, kind)
            this.effects = {}
            this.originalImage = img
        }

        getSprite () :Sprite {
            return this.sprite
        }

        addEffect(effect:Effect):void{
            this.effects[effect.name] = effect
            init();
        }

        isOnEffect(): boolean {
            return false
        }

        activateEffect(effectName:string): void {
            const eff = this.effects[effectName]
            if(!eff) throw "Effect was not found:" + effectName

            // skip if still in effect
            if(this.currentEffect) return;

            this.currentEffect = eff
            this.remainCooldown =  eff.cooldown

            onEffectItems.push(this)

            animation.runImageAnimation(this.sprite, eff.frames, eff.interval, false)
            
            if (eff.event.afterTrigger)
                eff.event.afterTrigger(this)
        }

        clearEffect(): void{
            this.currentEffect = null
            this.remainCooldown = 0
            this.sprite.setImage(this.originalImage)
        }
    }
}