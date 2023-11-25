export const VERSION = '0.3.1'
// /**
//  * deps.ts
//  *
//  * This module re-exports the required methods from the dependant remote Ramda module.
//  */
// export {
//   add,
//   multiply,
// } from "https://x.nest.land/ramda@0.27.0/source/index.js";
export type {
  Item,
  Storage,
} from 'https://denopkg.com/ultraxlight/storage@0.3.2/src/types.ts'
export { init as memoryStorage } from 'https://denopkg.com/ultraxlight/storage@0.3.2/implementations/memory.ts'
