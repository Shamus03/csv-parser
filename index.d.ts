export interface Options {
  separator?: string
}
function parse(str: string): string[][];
function parse(str: string, opts: Options): string[][];

export default parse
export {
  parse
}