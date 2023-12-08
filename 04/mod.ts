import { readPuzzleInput, splitByNewline } from "../util.ts"

let lines = splitByNewline(readPuzzleInput("04/input.txt"))
  .map((l) => l.trim())
  .filter(Boolean)

export let removeCard = (line) => line.replace(/Card\W+\d+:/, "").trim()
export let splitOnBar = (line) => line.split("|")

export let parseInt = (n: string) => Number.parseInt(n, 10)
export let parseNums = (nums: string) =>
  [...nums.matchAll(/\d+/g)]?.map((v) => parseInt(v.at(0)!))

export let getCards = (lineWithoutCard) => {
  let [winning, own] = splitOnBar(lineWithoutCard)
  own = parseNums(own)
  winning = parseNums(winning)

  return {
    own,
    winning
  }
}

export let matchWinningNumbers = ({ winning, own }) => {
  return own.filter((v) => winning.includes(v))
}

export let getPointForMatches = <T>(a: ReadonlyArray<T>) => {
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

    c += getPointForMatches(matchWinningNumbers(getCards(removeCard(line))))
  }
  return c
}

console.table({ part1: part1(lines) })

{
}
