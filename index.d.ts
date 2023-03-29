declare module '@shamus03/csv-parser' {
  export interface Options {
    separator?: string
    allowExtraContentAfterQuotedValue?: boolean
  }
  function parse(str: string): string[][];
  function parse(str: string, opts: Options): string[][];
  export default parse
  export {
    parse
  }
}
