import Item = PlatformerExtensions.Item

/**
 * Sprites on screen
 */
//% weight=99 color="#4B7BEC" icon="\uf1d8"
//% groups='["Create", "Physics", "Effects", "Projectiles", "Overlaps", "Lifecycle"]'
namespace PlatformerItems {
    

    /**
     * Create a item from an image
     * @param img the image
     */
    //% blockId=platformer_extensions_create_item
    //% block="Item %img=screen_image_picker of kind %kind=spritekind"
    //% expandableArgumentMode=toggle
    //% blockSetVariable=myItem
    //% group="Effect"
    //% weight=100
    export function createItem(img:Image, kind:number): Item {
        return new Item(img, kind)
    }

    //% blockId=sprite_set_effect
    //% block="Set ITem $item Effect $name Frames $frames Frame Interval(ms) $interval Cooldown (ms) $cooldown"
    //% name.shadow=sprite_effect_names
    //% item.shadow=variables_get
    //% frames.shadow=animation_editor
    //% interval.shadow=timePicker
    //% cooldown.shadow=timePicker
    //% handlerStatement=1
    //% weight=40
    //% group="Effects"
    //% draggableParameters = "reporter"
    export function setSpriteEffect(
        item: Item, 
        name: string, 
        frames: Image[], 
        interval: number, 
        cooldown:number,
        afterTrigger: (activeItem:Item)=>void):void {
        
        
        item.addEffect({name, frames,interval,cooldown,event:{afterTrigger}})
    }

    //% blockId=sprite_trigger_effect
    //% block="Trigger Item $item Effect $name"
    //% name.shadow=sprite_effect_names
    //% item.shadow=variables_get
    //% frames.shadow=animation_editor
    //% weight=40
    //% group="Effects"
    export function triggerEff(item:Item, name:string):void{
        if(item.isOnEffect()) return
        item.activateEffect(name)
    }

    //% blockId=platformer_extensions_get_item_sprite
    //% block="Get Item $item 's sprite"
    //% item.shadow=variables_get
    //% weight=40
    //% group="Effects"
    export function itemSprite(item:Item): Sprite{
        return item.getSprite()
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