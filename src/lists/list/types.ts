import { Item } from 'storage/src/types.ts'

/** List Object Type */
export interface List extends Item {
  /** Item title */
  title: string
  /** Items */
  items: string[]
}

/** Interact with Lists */
export type ListInterface = {
  create: (title: string) => Promise<List>
  get: (id: string) => Promise<List | null>
  getAll: () => Promise<List[]>
  update: (id: string, updateObj: Partial<List>) => Promise<List>
  remove: (id: string) => Promise<List | null>
  /** Add ListItem */
  addItem: (listId: string, itemId: string) => Promise<List>
  /** Remove ListItem */
  removeItem: (listId: string, itemIdx: number) => Promise<List>
}
