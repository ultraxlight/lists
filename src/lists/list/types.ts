import { Item } from 'https://denopkg.com/ultraxlight/storage@0.2.0/src/types.ts'

/** List Object Type */
export interface List extends Item {
  /** Item title */
  title: string
  /** Items */
  items: string[]
}
