import { readPuzzleInput, splitByNewline } from "../util.ts"

let lines = splitByNewline(readPuzzleInput("04/input.txt"))
  .map((l) => l.trim())
  .filter(Boolean)

export let removeCard = (line: string) => line.replace(/Card\W+\d+:/, "").trim()
export let splitOnBar = (line: string) => line.split("|")

export let parseInt = (n: string) => Number.parseInt(n, 10)
export let parseNums = (nums: string) =>
  [...nums.matchAll(/\d+/g)]?.map((v) => parseInt(v.at(0)!))

export let getCards = (lineWithoutCard: string) => {
  let [winning, own] = splitOnBar(lineWithoutCard).map(parseNums)

  return {
    own,
    winning
  }
}

let parseLine = (line: string) => getCards(removeCard(line))

export let matchWinningNumbers = ({
  winning,
  own
}: ReturnType<typeof getCards>) => {
  return own.filter((v) => winning.includes(v))
}

export let getPointsForMatches = <T>(a: ReadonlyArray<T>) => {
  if (a.length === 0) {
    return 0
  }
  if (a.length === 1) {
    return 1
  }
  let points = 1
  let arr = a.slice(1)
  for (let index = 0; index < arr.length; index++) {
    points *= 2
  }
  return points
}

let part1 = (lines: ReadonlyArray<string>) => {
  let c = 0
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    c += getPointsForMatches(matchWinningNumbers(parseLine(line)))
  }
  return c
}

console.table({ part1: part1(lines) })
