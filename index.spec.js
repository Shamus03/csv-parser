parse = require('./index.js')

describe('parse', () => {
  it('Handles basic test data', () => {
    const str = `a,b,c
d,e
f,g,h,i`
  const parsed = parse(str)
    expect(parsed).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e'],
      ['f', 'g', 'h', 'i'],
    ])
  })

  it('Handles basic test data with overridden separator', () => {
    const str = `a\tb\tc
d\te
f\tg\th\ti`
  const parsed = parse(str, { separator: '\t' })
    expect(parsed).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e'],
      ['f', 'g', 'h', 'i'],
    ])
  })

  it('Handles empty string', () => {
    const str = ``
  const parsed = parse(str)
    expect(parsed).toEqual([[]])
  })

  it('Handles empty values', () => {
    const str = `a,b,,c`
  const parsed = parse(str)
    expect(parsed).toEqual([
      ['a', 'b', '', 'c']
    ])
  })

  it('Handles quoted values', () => {
    const str = `a,"b",c`
  const parsed = parse(str)
    expect(parsed).toEqual([
      ['a', 'b', 'c'],
    ])
  })

  it('Handles separators within quoted values', () => {
    const str = `a,"b,c",d`
  const parsed = parse(str)
    expect(parsed).toEqual([
      ['a', 'b,c', 'd'],
    ])
  })

  it('Handles newlines within a quoted value', () => {
    const str = `a,"b
c",d`
  const parsed = parse(str)
    expect(parsed).toEqual([
      ['a', 'b\nc', 'd'],
    ])
  })

  it('Handles double-quotes within quotes', () => {
    const str = `a,"b "" c",d`
  const parsed = parse(str)
    expect(parsed).toEqual([
      ['a', 'b " c', 'd'],
    ])
  })

  it('Throws an error on an unclosed quote', () => {
    const str = `a,b,c
and,"an unclosed quote
g,h,i`
    expect(() => parse(str)).toThrow(/^expected closing quote/)
  })

  it('Throws an error on extra values after quoted field', () => {
    const str = `a,b,c
here's a,"bad"value
g,h,i`
    expect(() => parse(str)).toThrow(/^expected separator/)
  })
})