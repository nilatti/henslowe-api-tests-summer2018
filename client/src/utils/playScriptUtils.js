import _ from 'lodash'

var Syllable = require('syllable')

function calculateLineCount(lines) {
  lines.map((line) => {
    line.count = 1
    let syllablesPerLine
    let defaultSyllables = 10
    let count = 0
    if (line.new_content && line.new_content.match(/[a-zA-Z]+/)) {
      syllablesPerLine = Syllable(line.new_content)
    } else if (line.new_content && line.new_content.match(/^\s$/)) {
      syllablesPerLine = 0
    } else {
      syllablesPerLine = Syllable(line.original_content)
    }
    line.count = calculateChange(syllablesPerLine, defaultSyllables)
  })
  return _.sumBy(lines, 'count')
}

function calculateRunTime(lines, linesPerMinute) { //exects lines per minute as int and lines as array
  return  calculateLineCount(lines)/ linesPerMinute
}

function calculateChange(a, b){
  return a/b
}

function getFrenchScenesFromAct(act) {
  let french_scenes = []
  act.scenes.map((scene) => {
    french_scenes.push(scene.french_scenes)
  })
  return french_scenes
}

function getFrenchScenesFromPlay(play) {
  let french_scenes = []
  play.acts.map((act) => {
    french_scenes.push(getFrenchScenesFromAct(act))
  })
  return french_scenes
}

function letterValue(str){
    var anum={
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11,
        l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 19, t: 20,
        u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
    }
    if(str.length== 1) return anum[str] || ' ';
    return str.split('').map(letterValue);
}

function mergeTextFromFrenchScenes(frenchScenes) {
    let allText = {
      lines: [],
      sound_cues: [],
      stage_directions: [],
    }
    frenchScenes.map((frenchScene) =>
      {
        allText.lines = allText.lines.concat(frenchScene.lines)
        allText.stage_directions = allText.stage_directions.concat(frenchScene.stage_directions)
        allText.sound_cues = allText.sound_cues.concat(frenchScene.sound_cues)
      }
    )
    return allText
}

function sortLines(arrayOfLines) {
  let brokenOut = arrayOfLines.map((line) => {
    let line_number
    let act_number
    let scene_number
    if (line.number) {
      if (line.number.match(/EPI/)) {
        let number = line.number.replace('SD ', '')
        let number_pieces = number.split('.')
        act_number = 6
        scene_number = 1
        line_number = parseFloat(number_pieces[1])
      } else {
        let number = line.number.replace('SD ', '')
        let number_pieces = number.split('.')
        act_number = parseFloat(number_pieces[0])
        scene_number = parseFloat(number_pieces[1])
        if (number_pieces[2].match(/[a-zA-z]/)) {
          let letter = number_pieces[2].match(/[a-z]/)
          let numString = number_pieces[2].match(/[^a-z]/) + "." + letter
          console.log(numString)
          line_number = parseFloat(numString)
          console.log(line_number)
        } else {
          line_number = parseFloat(number_pieces[2])
        }
        if (typeof scene_number === 'undefined') {
          console.log(line)
        }
      }
    } else {
      console.log('line does not have number', line)
    }
    return {
      act_number: act_number,
      line: line,
      line_number: line_number,
      scene_number: scene_number
    }
  })
  let sorted = _.sortBy(brokenOut, 'act_number', 'scene_number', 'line_number')
  return sorted.map((item) => item.line)
}

export {
  calculateLineCount,
  calculateRunTime,
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
  sortLines
}
