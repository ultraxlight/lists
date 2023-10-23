import { Item } from 'https://denopkg.com/ultraxlight/storage@0.2.0/src/types.ts'

/** ListItem Object Type */
export interface ListItem extends Item {
  /** Item title */
  title: string
  /** Items */
  items: string[]
}
