import { Item } from 'storage/src/types.ts'

/** ListItem Object Type */
export interface ListItem extends Item {
  /** Item title */
  title: string
  /** Whether or not the item is marked done */
  is_done: boolean
}
