const resetColor = '\x1b[0m'

function printLog(...params) {
  const greenColor = '\x1b[32;1m'
  console.log(greenColor, ...params, resetColor)
}

function logAndExit(error) {
  printError('\nStacktrace:\n', error)
  process.exit(1)
}

module.exports = {
  logAndExit,
  printLog,
}
