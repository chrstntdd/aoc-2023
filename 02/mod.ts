import * as fs from "node:fs"
import * as url from "node:url"
import * as p from "node:path"

let __dirname = url.fileURLToPath(new URL(".", import.meta.url))
let input = fs.readFileSync(p.resolve(__dirname, "input.txt"), "utf-8")
let lines = input.split("\n")

let getGameId = (line: string) => /^Game (\d+):/.exec(line)?.at(1)

let getGameResults = (line: string) => /^Game (\d+):(.*)$/.exec(line)?.at(2)

let getSetFromResults = (l: string) =>
  l.split(";").map((s) => s.split(",").map((x) => x.trim()))

let matchCubeResult = (s: string) => /^(\d+)\W(red|blue|green)/.exec(s)

let toInt = (s: string) => Number.parseInt(s, 10)

let pairs = (resultSets) =>
  resultSets.flatMap((res) => {
    let re = matchCubeResult(res)
    if (re) {
      return [[re.at(1), re.at(2)]]
    }
    return []
  })

let colorLimits = {
  red: 12,
  green: 13,
  blue: 14
}

let isValidGame = (results, limits) => {
  for (let [val, color] of results) {
    if (toInt(val) > limits[color]) {
      return false
    }
  }
  return true
}

let main = (l: ReadonlyArray<string>, limits: typeof colorLimits) => {
  let count = 0
  for (let line of l) {
    let gameResult = getGameResults(line)
    let gameId = getGameId(line)!
    if (!gameResult) continue
    let results = pairs(getSetFromResults(gameResult).flat())
    if (isValidGame(results, limits)) {
      count += toInt(gameId)
    }
  }
  return count
}

let part1 = main(lines, colorLimits)

console.table({ part1 })

{
  // Part 2

  let main = (l: ReadonlyArray<string>) => {
    let sum = 0
    for (let line of l) {
      let gameResult = getGameResults(line)
      if (!gameResult) continue
      let results = pairs(getSetFromResults(gameResult).flat()).map((pair) => [
        toInt(pair[0]),
        pair[1]
      ])
      let red = 0,
        green = 0,
        blue = 0
      for (let [val, color] of results) {
        switch (color) {
          case "red":
            if (val > red) red = val
            break
          case "green":
            if (val > green) green = val
            break
          case "blue":
            if (val > blue) blue = val
            break
        }
      }

      sum += red * green * blue
    }

    return sum
  }

  // Get the max count of blocks for each color in each game
  let part2 = main(lines)

  console.table({ part2 })
}
