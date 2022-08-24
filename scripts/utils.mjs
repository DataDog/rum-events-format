const resetColor = '\x1b[0m'

export function printLog(...params) {
  const greenColor = '\x1b[32;1m'
  console.log(greenColor, ...params, resetColor)
}

export function printError(...params) {
  const redColor = '\x1b[31;1m'
  console.log(redColor, ...params, resetColor)
}

export function logAndExit(error) {
  printError('\nStacktrace:\n', error)
  process.exit(1)
}
