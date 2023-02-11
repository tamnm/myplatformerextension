namespace SpriteKind {
    export const Weapon = SpriteKind.create()
}
function createBall () {
    ball = PlatformerItems.createItem(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Weapon)
    ball.addEffect(PlatformerItems.createItemEffect(PlatformerItems._effName("Active"), [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `], 100, 500))
    ball.addEffectEventHandler("Active", PlatformerItems.EffectEvent.AfterTrigger, function (ball) {
        timer.after(150, function () {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f f . . . . 
                . . . . f 4 4 4 4 4 4 4 f . . . 
                . . . . f 4 4 4 4 4 4 4 f . . . 
                . . . . f 4 4 4 3 4 4 4 f . . . 
                . . . . f 4 4 4 4 4 4 4 f . . . 
                . . . . f 4 4 4 4 4 4 4 f . . . 
                . . . . f 4 4 4 4 4 4 4 f . . . 
                . . . . f 4 4 4 4 4 4 4 f . . . 
                . . . . . f f f f f f f . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, ball.getSprite(), 100 * ball.getDirection(), -50)
            projectile.ay = 100
            projectile.setFlag(SpriteFlag.AutoDestroy, true)
            music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        })
    })
    return ball
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    myItem.activateEffect("Active")
})
function createGun () {
    gun = PlatformerItems.createItem(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f . . . . . . . . . . . 
        . . f f f f f f f f f f f f 2 . 
        . . f f f f f f f f f f f f 2 . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Weapon)
    gun.addEffect(PlatformerItems.createItemEffect(PlatformerItems._effName("Active"), [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f . . . . . . . . . . . 
        . . f f f f f f f f f f f f 2 . 
        . . f f f f f f f f f f f f 2 . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f . . . . . . . . . . . 
        . . f f f f f f f f f f f f 2 5 
        . . f f f f f f f f f f f f 2 5 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f . . . . . . . . . . . 
        . . f f f f f f f f f f f f 2 . 
        . . f f f f f f f f f f f f 2 . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . f f f . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `], 100, 1000))
    gun.addEffectEventHandler("Active", PlatformerItems.EffectEvent.AfterTrigger, function (item) {
        timer.after(50, function () {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f f 2 . . . . . . 
                . . . . . f f f f 2 . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, item.getSprite(), 200 * item.getDirection(), 0)
        })
    })
    return gun
}
function createWand () {
    wand = PlatformerItems.createItem(img`
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
    wand.addEffect(PlatformerItems.createItemEffect(PlatformerItems._effName("Active"), [img`
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
    wand.addEffectEventHandler("Active", PlatformerItems.EffectEvent.AfterTrigger, function (wand) {
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
                `, wand.getSprite(), 100 * wand.getDirection(), 0)
            projectile.setFlag(SpriteFlag.AutoDestroy, true)
            music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        })
    })
    return wand
}
let wand: PlatformerItems.Item = null
let gun: PlatformerItems.Item = null
let projectile: Sprite = null
let ball: PlatformerItems.Item = null
let myItem: PlatformerItems.Item = null
let picture = null
scene.setBackgroundColor(13)
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f f . . . . . . . . . 
    . . . f f f f f f f f f f f . . 
    . . f f f f f f f f f f f f f . 
    . f f f f f f f f d d d d d f . 
    . . . d d d d d d d f f d . . . 
    . . . . d d d d d d d d . . . . 
    . . . . d d d d d d d . . . . . 
    . . . . 4 4 4 4 4 4 4 4 . . . . 
    . . . . 4 4 4 4 4 4 4 . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . e e . . . e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 50, 50)
myItem = createWand()
myItem.attachToSprice(mySprite, 10, 0)
