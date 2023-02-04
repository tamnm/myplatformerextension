controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    PlatformerItems.triggerEff(mySprite, "Active")
})
let projectile: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(7)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . f f 9 9 9 . . . 
    . . . . . . . . f 9 9 9 9 9 . . 
    . . . . . . . . f 9 9 9 9 9 9 . 
    . . . . . . . . f f 9 9 9 9 9 . 
    . . . . . . . . . f 9 9 9 9 9 . 
    . . . . . . . e f f f 9 9 9 f f 
    . . . . . . . e e e f f f f f . 
    . . . . . e e e f e . . . . . . 
    . . . . e e f f e . . . . . . . 
    . . e e f e f . . . . . . . . . 
    . e . f e e . . . . . . . . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
PlatformerItems.setSpriteEffect(mySprite, "Active", [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . f f 9 9 9 . . . 
    . . . . . . . . f 9 9 9 9 9 . . 
    . . . . . . . . f 9 9 9 9 9 9 . 
    . . . . . . . . f f 9 9 9 9 9 . 
    . . . . . . . . . f 9 9 9 9 9 . 
    . . . . . . . e f f f 9 9 9 f f 
    . . . . . . . e e e f f f f f . 
    . . . . . e e e f e . . . . . . 
    . . . . e e f f e . . . . . . . 
    . . e e f e f . . . . . . . . . 
    . e . f e e . . . . . . . . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 5 f f 9 9 9 5 . . 
    . . . . . . . . f 9 9 9 9 9 5 . 
    . . . . . . . . f 9 9 9 9 9 9 . 
    . . . . . . 5 . f f 9 9 9 9 9 . 
    . . . . . . 5 . . f 9 9 9 9 9 . 
    . . . . . . . e f f f 9 9 9 f f 
    . . . . . . . e e e f f f f f . 
    . . . . . e e e f e . . . . . . 
    . . . . e e f f e . . . 5 . . . 
    . . e e f e f . . . . . . . . . 
    . e . f e e . . . . . . . . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . 5 5 5 
    . . . . 5 . . 5 f f 9 9 9 5 5 5 
    . . . . 5 . . . f 9 9 9 9 9 5 5 
    . . . . . 5 . 5 f 9 9 9 9 9 9 . 
    . . . . 5 . . . f f 9 9 9 9 9 . 
    . . . . . 5 . . . f 9 9 9 9 9 . 
    . . . . . 5 . e f f f 9 9 9 f f 
    . . . . . . . e e e f f f f f . 
    . . . . . e e e f e . . . . . . 
    . . . . e e f f e . . . 5 . . 5 
    . . e e f e f . . . 5 . 5 . . . 
    . e . f e e . . . . . . 5 . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . 5 5 5 
    . . . . 5 . . 5 f f 9 5 9 5 5 5 
    . . . . 5 . . . f 9 9 9 2 9 5 5 
    . . . . . 5 . 5 f 9 2 5 9 2 9 . 
    . . . . 5 . . . f f 2 9 2 2 5 . 
    . . . . . 5 . . . f 9 9 5 9 2 . 
    . . . 5 . 5 . e f f f 2 9 9 f f 
    . . . . . . . e e e f f f f f . 
    . . . 5 . e e e f e . . . . . . 
    . . . . e e f f e . . . 5 . . 5 
    . . e e f e f 5 . . 5 . 5 . . . 
    . e . f e e . . 5 . . . 5 . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . 5 5 5 
    . . . . 5 . . 5 f f 2 2 2 5 5 5 
    . . . . 5 . . . f 2 2 2 2 2 5 5 
    . . . . . 5 . 5 f 2 2 2 2 2 2 . 
    . . . . 5 . . . f f 2 2 2 2 2 . 
    . . . . . 5 . . . f 2 2 2 2 2 . 
    . . . 5 . 5 . e f f f 2 2 2 f f 
    . . . . . . . e e e f f f f f . 
    . . . 5 . e e e f e . . . . . . 
    . . . . e e f f e . . . 5 . . 5 
    . . e e f e f 5 . . 5 . 5 . . . 
    . e . f e e . . 5 . . . 5 . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . f f 9 9 9 . . . 
    . . . . . . . . f 9 9 9 9 9 . . 
    . . . . . . . . f 9 9 9 9 9 9 . 
    . . . . . . . . f f 9 9 9 9 9 . 
    . . . . . . . . . f 9 9 9 9 9 . 
    . . . . . . . e f f f 9 9 9 f f 
    . . . . . . . e e e f f f f f . 
    . . . . . e e e f e . . . . . . 
    . . . . e e f f e . . . . . . . 
    . . e e f e f . . . . . . . . . 
    . e . f e e . . . . . . . . . . 
    . e e f f . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    . f e e . . . . . . . . . . . . 
    f e . . . . . . . . . . . . . . 
    `], 500, 500, function (onEffectSprite) {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . 2 2 2 2 2 2 . . . . 
        . . . . 2 5 5 5 5 2 2 . 2 . . . 
        . . . . 5 . . 5 . 5 2 2 2 . . . 
        . . . . 5 5 5 5 5 5 5 2 . . . . 
        . . . . 2 2 5 5 5 5 5 2 . . . . 
        . . . . 2 2 5 5 5 5 5 2 . . . . 
        . . . . . 2 2 . 5 5 5 5 . . . . 
        . . . . . . . 2 2 2 5 2 . . . . 
        . . . . . . . . . 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 50, 50)
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
