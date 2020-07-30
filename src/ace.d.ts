// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Ace } from 'ace-builds';

declare global {
  namespace ace {
    export const config: Ace.Config;
    export function edit(el: Element | string, options?: Partial<Ace.EditorOptions>): Ace.Editor;
  }
}
