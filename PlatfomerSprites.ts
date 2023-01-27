/**
 * Basic functions for Platformer Items
 */
//% color="#a35c74" icon="⚒"
//% groups="['Sprite', 'Range']"
namespace PlatFormerSprites {
    //% block
    //% group="Sprite"
    export function flipSpriteHorizontal(sprite:Sprite):void{
        sprite.image.flipX()
    }

    //% block
    //% group="Sprite"
    export function cloneAndFlipVertically(sprite: Sprite): void {
        sprite.image.flipX()
    }
    

    //% block
    //% group="Melee"
    export function bean() {

    }

    //% block
    //% group="Range"
    export function apple() {

    }

    //% block
    //% group="Range"
    export function banana() {

    }
}