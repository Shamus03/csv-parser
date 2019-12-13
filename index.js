function parse(str, opts) {
  opts = Object.assign({
    separator: ','
  }, opts)

  let i = 0
  function parseCsv() {
    const lines = []
    let line
    while (line = parseLine()) {
      lines.push(line)
      if (i >= str.length) {
        break
      }
    }
    return lines
  }
  function parseLine() {
    const line = []
    let first = true
    while (i < str.length && str[i] !== '\n') {
      if (!first) {
        eatSeparator()
      }
      first = false
      let val = parseValue(true)
      if (val === undefined) {
        val = parseValue(false)
      }
      if (val !== undefined) {
        line.push(val)
      }
    }
    i++
    return line
  }
  function parseValue(quoted) {
    if (quoted) {
      if (str[i] !== '"') {
        return
      }
      i++
    }
    const chars = []
    let ch
    while (ch = parseCharacter(quoted)) {
      chars.push(ch)
    }
    return chars.join('')
  }
  function parseCharacter(quoted) {
    if (str[i] === '"') {
      i++
      if (quoted) {
        if (str[i] === '"') {
          i++
          return '"'
        }
        return
      }
      return '"'
    }
    if (!quoted && (str[i] === opts.separator || str[i] === '\n')) {
      return
    }
    if (quoted && i >= str.length) {
      fail('expected closing quote', 'should be a closing quote')
    }
    return str[i++]
  }
  function eatSeparator() {
    if (str[i] !== opts.separator) {
      fail('expected separator', 'should be ' + JSON.stringify(opts.separator))
    }
    i++
  }
  function fail(message, description) {
    const start = Math.max(0, i-5)
    throw new Error(`${message}:
at: ${str.slice(start, start+6)}
         ^ ${description}`)
  }
  return parseCsv()
}

exports.default = parse
exports.parse = parse