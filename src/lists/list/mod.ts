import StorageType from 'https://denopkg.com/ultraxlight/storage@0.3.1/src/types.ts'
import { List as ListType } from './types.ts'

/** Basic List functionality */
function List(Storage: StorageType) {
  return {
    create: (title: string) => {
      if (!title) {
        return Promise.reject('Missing title')
      }

      return Storage.create<ListType>({ title, items: [] })
    },
    get: (id: string) => {
      if (!id) {
        throw new TypeError('Missing ID')
      }

      return Storage.get<ListType>(id)
    },
    getAll: () => {
      return Storage.getAll<ListType>()
    },
    update: (id: string, updateObj: Partial<ListType>) => {
      if (!id) {
        throw new TypeError('Missing ID')
      }

      if (typeof id !== 'string') {
        throw new TypeError('ID should be string')
      }

      return Storage.update<ListType>(id, updateObj)
    },
    remove: (id: string) => {
      if (!id) {
        throw new TypeError('Missing ID')
      }

      return Storage.remove<ListType>(id)
    },
    addItem: async (listId: string, itemId: string, idx?: number) => {
      if (!listId) {
        throw new TypeError('Missing List ID')
      }
      if (!itemId) {
        throw new TypeError('Missing Item ID')
      }

      const list = await Storage.get<ListType>(listId)

      if (!list) {
        throw new Error(`No List with ID ${listId} found`)
      }

      const items = [...list.items]

      if (!isNaN(idx as number)) {
        items.splice(idx as number, 0, itemId)
      } else {
        items.push(itemId)
      }

      return Storage.update<ListType>(listId, { items })
    },
    removeItem: async (listId: string, itemIdx: number) => {
      if (!listId) {
        throw new TypeError('Missing List ID')
      }
      if (!itemIdx) {
        throw new TypeError('Missing Item index')
      }

      const list = await Storage.get<ListType>(listId)

      if (!list) {
        throw new Error(`No List with ID ${listId} found`)
      }

      const items = list.items.filter((_: unknown, idx: number) => idx !== itemIdx)

      return Storage.update<ListType>(listId, { items })
    },
  }
}
export default List
