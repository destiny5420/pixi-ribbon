import RibbonManager from './RibbonManager'

function eventBinding() {
  const self = this

  window.addEventListener('resize', () => {
    self.ribbonManager.onResize()
  })
}

function App() {
  console.log('The construct of App.')

  const self = this
  const pixiContainer = document.getElementById('pixi-container')
  const ribbonCount = 250
  const paddingSize = 50
  const imgPath = '../assets/images/rect_sm.jpg'
  self.ribbonManager = new RibbonManager(pixiContainer, ribbonCount, paddingSize, imgPath)

  eventBinding.call(this)
}

export default App
