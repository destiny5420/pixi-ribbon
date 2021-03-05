import Ribbons from './Ribbons'

function eventBinding() {
  const self = this

  window.addEventListener('resize', () => {
    self.size.width = window.innerWidth
    self.size.height = window.innerHeight
    self.pixi.renderer.resize(self.size.width, self.size.height)
    self.dudeBounds = new PIXI.Rectangle(
      -self.dudeBoundsPadding,
      -self.dudeBoundsPadding,
      self.pixi.screen.width + self.dudeBoundsPadding * 2,
      self.pixi.screen.height + self.dudeBoundsPadding * 2,
    )
    self.ribbonsCollections.forEach((element) => {
      element.onresize()
    })
  })
}

function App() {
  console.log('The construct of App.')

  const self = this

  self.size = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  self.pixi = new PIXI.Application({
    width: self.size.width,
    height: self.size.height,
    backgroundColor: PIXI.utils.string2hex('#b2b2b2'),
    transparent: true,
  })

  $('#pixi-container').append(self.pixi.view)

  // holder to store the aliens
  self.ribbonsCollections = []
  const ribbonsCount = 75
  self.dudeBoundsPadding = 50
  self.dudeBounds = new PIXI.Rectangle(
    -self.dudeBoundsPadding,
    -self.dudeBoundsPadding,
    self.pixi.screen.width + self.dudeBoundsPadding * 2,
    self.pixi.screen.height + self.dudeBoundsPadding * 2,
  )

  for (let i = 0; i < ribbonsCount; i += 1) {
    const ribbons = new Ribbons(PIXI.Sprite.from('../assets/images/rect_sm.jpg'))
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

  eventBinding.call(this)
}

export default App
