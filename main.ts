controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.image.flipX()
})
let mySprite: Sprite = null
scene.setBackgroundColor(11)
mySprite = sprites.create(img`
    f f f f f f f f f f f f f . . . 
    . . f f f f f f f f f f f . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . f f 5 f f f f f f f f 5 f f . 
    f f f 5 f f 1 f f f 1 f 5 f f f 
    f f f 5 f f f f f f f f 5 f f f 
    f f . 5 f f f f f f f f 5 . f f 
    f f . 5 f f f f f f f f 5 . f f 
    5 5 . 5 f f 1 1 1 1 f f 5 . 5 5 
    5 5 . 5 f f f f f f f f 5 . 5 5 
    . . . 5 f f f f f f f f 5 . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . . f f . . . . . . f f . . . 
    . . . f f . . . . . . f f . . . 
    . . . e e . . . . . . e e . . . 
    . e e e e . . . . . . e e e e . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
