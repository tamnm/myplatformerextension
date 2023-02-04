
/**
 * Sprites on screen
 */
//% weight=99 color="#4B7BEC" icon="\uf1d8"
//% groups='["Create", "Physics", "Effects", "Projectiles", "Overlaps", "Lifecycle"]'
namespace PlatformerItems {
    let onEffectSprites:Sprite[]

    function init(){
        if (onEffectSprites != undefined)
        return; 
        
        onEffectSprites = []

        game.currentScene().eventContext.registerFrameHandler(scene.ANIMATION_UPDATE_PRIORITY, update);
    }

    function update(){
        let stillOnEffSprites:Sprite[] = [];

        const dt = game.currentScene().eventContext.deltaTimeMillis;
        onEffectSprites.forEach(sprite=>{
            const actEff = sprite.data["ActiveEff"]

            let remain = sprite.data[actEff+ "_remainCooldown"]
            remain -= dt
            sprite.data[actEff + "_remainCooldown"] = remain
            
            if(remain <=0) {
                sprite.data["ActiveEff"] = null
                sprite.setImage(sprite.data["OriginalImg"])
            }else{
                stillOnEffSprites.push(sprite)
            }
        })

        onEffectSprites = stillOnEffSprites
    }

    //% blockId=sprite_set_effect
    //% block="Set Sprite $sprite Effect $name Frames $frames Frame Interval(ms) $interval Cooldown (ms) $cooldown"
    //% name.shadow=sprite_effect_names
    //% sprite.shadow=variables_get
    //% frames.shadow=animation_editor
    //% interval.shadow=timePicker
    //% cooldown.shadow=timePicker
    //% handlerStatement=1
    //% weight=40
    //% group="Effects"
    export function setSpriteEffect(
        sprite: Sprite, 
        name: string, 
        frames: Image[], 
        interval: number, 
        cooldown:number,
        onEffectTrigger:(s:Sprite)=>void):void {
        init();
        
        sprite.data["OriginalImg"] = sprite.image;
        sprite.data[name+"_frames"] = frames;
        sprite.data[name + "_interval"] = interval;
        sprite.data[name+"_cooldown"] = cooldown;
    }

    //% blockId=sprite_trigger_effect
    //% block="Trigger Sprite $sprite Effect $name"
    //% name.shadow=sprite_effect_names
    //% sprite.shadow=variables_get
    //% frames.shadow=animation_editor
    //% weight=40
    //% group="Effects"
    export function triggerEff(sprite:Sprite, name:string):void{
        if (sprite.data["ActiveEff"]) return;
        

        sprite.data["ActiveEff"] = name;
        sprite.data[name + "_remainCooldown"] = sprite.data[name + "_cooldown"];

        onEffectSprites.push(sprite)

        animation.runImageAnimation(sprite, sprite.data[name + "_frames"], sprite.data[name + "_interval"],false)

    }

    //% blockId=sprite_effect_names block="%eff_name"
    //% //% blockHidden=true shim=TD_ID
    //% eff_name.fieldEditor="autocomplete"
    //% eff_name.fieldOptions.decompileLiterals=true
    //% eff_name.fieldOptions.key="spritedataimage"
    //% weight=40
    //% group="Effects"
    export function _effName(eff_name: string) {
        return eff_name
    }
}