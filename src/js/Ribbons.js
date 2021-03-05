import formula from '../utility/formula'

function setting() {
  this.sprite.anchor.set(0.5)
  this.paddingWidth = window.innerWidth * 0.01
}

function Ribbons(sprite) {
  this.sprite = sprite
  this.baseX = 0
  this.turningSpeed = 0
  this.scalePlusStats = true
  this.scaleFactor = 1
  this.posOffsetFactor = 1
  this.posOffsetFrequency = 1
  this.speed = 1
  this.color = PIXI.utils.string2hex(this.colorData[0])
  this.paddingWidth = 0

  setting.call(this)
}

Ribbons.prototype.INIT_POS_Y = -200

Ribbons.prototype.colorData = [
  '#9b59b6',
  '#34495e',
  '#e74c3c',
  '#27ae60',
  '#16a085',
  '#f1c40f',
  '#7f8c8d',
  '#f6b93b',
  '#e55039',
  '#4a69bd',
  '#60a3bc',
  '#78e08f',
]

Ribbons.prototype.init = function () {
  this.turningSpeed = Math.random()
  this.scaleFactor = formula.getRandom(2, 10) * 0.01
  this.posOffsetFactor = formula.getRandom(5, 50)
  this.posOffsetFrequency = formula.getRandom(1, 3)
  this.speed = 1 + Math.random() * 1

  this.sprite.y = this.INIT_POS_Y + formula.getRandom(0, (window.innerHeight / 3) * 3) * -1
  this.baseX = formula.getRandom(0 + this.paddingWidth, window.innerWidth - this.paddingWidth)
  this.sprite.tint = PIXI.utils.string2hex(
    this.colorData[formula.getRandom(0, this.colorData.length - 1)],
  )
}

Ribbons.prototype.update = function (delta) {
  this.sprite.y += this.speed * delta
  this.sprite.x =
    this.baseX +
    Math.sin(formula.getDegree(this.sprite.y) / this.posOffsetFrequency) *
      this.posOffsetFactor *
      delta

  this.sprite.rotation += formula.getDegree(this.turningSpeed) * delta

  if (this.scalePlusStats) {
    this.sprite.scale.x += this.scaleFactor
  } else {
    this.sprite.scale.x -= this.scaleFactor
  }

  if (this.sprite.scale.x > 1) {
    this.scalePlusStats = false
  } else if (this.sprite.scale.x < 0) {
    this.scalePlusStats = true
  }
}

Ribbons.prototype.onresize = function () {
  this.paddingWidth = window.innerWidth * 0.05
}

export default Ribbons
