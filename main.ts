namespace SpriteKind {
    export const Weapon = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    myITem.activateEffect("Active")
})
let projectile: Sprite = null
let myITem: PlatformerItems.Item = null
scene.setBackgroundColor(13)
myITem = PlatformerItems.createItem(img`
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
    `, SpriteKind.Weapon)
myITem.addEffect(PlatformerItems.createItemEffect(PlatformerItems._effName("Active"), [img`
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
    `], 100, 500))
myITem.addEffectEventHandler("Active", PlatformerItems.EffectEvent.AfterTrigger, function (item) {
    timer.after(150, function () {
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
            `, item.getSprite(), 50, -100)
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
        music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    })
})
