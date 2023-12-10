class MainScene extends Phaser.Scene {
  preload() {
    this.load.image("potion")
    this.load.image("arrow")
  }

  create() {
    this.matter.world.setBounds();
    let arrow = this.add.image(0,50, "potion")
    let size = Phaser.Math.Between(1, 5)
    arrow.setScale(size)
    this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
      arrow.setX(pointer.x)
    })
    this.input.on(Phaser.Input.Events.POINTER_UP, () => {
      let potion = this.matter.add.image(arrow.x, 50, "potion")
      potion.setData("size", size)
      potion.setScale(size)
      potion.setCircle(16 * size)
      potion.setVelocity(0, 25)
      size = Phaser.Math.Between(1, 5)
      arrow.setScale(size)
      
      potion.setOnCollide(({bodyA, bodyB}) => {
        let a = bodyA.gameObject
        let b = bodyB.gameObject
        if (a && b) {
          if (a.getData("size") === b.getData("size")) {
            a.destroy(true)
            let size = b.getData("size") + 1
            b.setData("size", size)
            b.setScale(size)
          }
        }
      })
    })
  }
}

let Scale = Phaser.Scale
const game = new Phaser.Game({
  width: 1920,
  height: 1080,
  pixelArt: true,
  scene: MainScene,
  scale: {
    autoCenter: Scale.CENTER_BOTH,
    mode: Scale.FIT,
  },
  physics: {
    default: 'matter',
    matter: {
    },
  },
})