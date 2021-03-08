import Ribbons from './Ribbons'

function RibbonManager(container, count, paddingSize, imgPath) {
  console.log('The construct of RibbonManager')

  const self = this

  self.pixi = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: PIXI.utils.string2hex('#b2b2b2'),
    transparent: true,
  })

  container.append(self.pixi.view)

  self.ribbonsCollections = []
  const ribbonsCount = count
  self.dudeBoundsPadding = paddingSize
  self.dudeBounds = new PIXI.Rectangle(
    -self.dudeBoundsPadding,
    -self.dudeBoundsPadding,
    self.pixi.screen.width + self.dudeBoundsPadding * 2,
    self.pixi.screen.height + self.dudeBoundsPadding * 2,
  )

  for (let i = 0; i < ribbonsCount; i += 1) {
    const ribbons = new Ribbons(PIXI.Sprite.from(imgPath))
    ribbons.init()
    self.ribbonsCollections.push(ribbons)
    self.pixi.stage.addChild(ribbons.sprite)
  }

  self.pixi.ticker.add((delta) => {
    for (let i = 0; i < self.ribbonsCollections.length; i += 1) {
      const ribbons = self.ribbonsCollections[i]
      ribbons.update(delta)

      if (ribbons.sprite.y > self.dudeBounds.y + self.dudeBounds.height) {
        ribbons.init()
      }
    }
  })
}

RibbonManager.prototype.onResize = function () {
  const self = this

  self.pixi.renderer.resize(window.innerWidth, window.innerHeight)
  self.dudeBounds = new PIXI.Rectangle(
    -self.dudeBoundsPadding,
    -self.dudeBoundsPadding,
    self.pixi.screen.width + self.dudeBoundsPadding * 2,
    self.pixi.screen.height + self.dudeBoundsPadding * 2,
  )
  self.ribbonsCollections.forEach((element) => {
    element.onresize()
  })
}

export default RibbonManager
