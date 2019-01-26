let points = 1
const pointIncrement = 1

const bars = []
const pointsEle = document.getElementById('odometer')

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

const calcPercent = (cur, max) => {
  if (cur >= max) return 100
  return Math.round(100 * cur / max)
}

const updateProgressBar = (bar, points) => {
  bar.percent = calcPercent(points, bar.maxPoints)
  console.log(bar.percent, points, bar.maxPoints)
  bar.instance.set(bar.percent)
  return bar
}

const incrementPoints = (wait) => {
  setTimeout(() => {
    points += pointIncrement
    pointsEle.innerHTML = points
    bars.forEach(bar => {
      updateProgressBar(bar, points)
    })
    pointLoop()
  }, wait)
}

const pointLoop = () => {
  const lowestAmount = 1000
  const highestAmount = 5000
  incrementPoints(randInt(lowestAmount, highestAmount))
}

const genProgressBar = (id, points, maxPoints) => {
  const toReturn = {
    id,
    maxPoints,
    percent: calcPercent(points, maxPoints),
    instance: new ldBar(id),
  }
  toReturn.instance.set(toReturn.percent)
  return toReturn
}

const initBars = () => {
  const numBars = 4
  for (let bar = 0; bar < numBars; ++bar) {
    bars.push(genProgressBar(`#ldBar${bar}`, 0, randInt(10, 100)))
  }
}

const init = () => {
  pointLoop()
  initBars()
}

init()
