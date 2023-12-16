import { Item } from '../../../deps.ts'

/** ListItem Object Type */
export interface ListItem extends Item {
  /** Item title */
  title: string
  /** Whether or not the item is marked done */
  is_done: boolean
}

export type ListItemInterface = {
  create: (item: Partial<ListItem> & { title: string }) => Promise<ListItem>
  get: (id: string) => Promise<ListItem | null>
  getAll: () => Promise<ListItem[]>
  update: (id: string, updateObj: Partial<ListItem>) => Promise<ListItem>
  remove: (id: string) => Promise<ListItem | null>
}
