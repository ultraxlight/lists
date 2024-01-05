import { Storage as StorageType } from '../../../deps.ts'
import { List as ListType, ListInterface } from './types.ts'

/** Basic List functionality */
function List(Storage: StorageType): ListInterface {
  return {
    create: (list: Partial<ListType> & { title: string }) => {
      if (!list || !list.title) {
        return Promise.reject('Missing title')
      }

      const dflt = {
        items: [],
      }

      return Storage.create<ListType>({ ...dflt, ...list })
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
    addItem: async (listId: string, itemId: string) => {
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

      items.push(itemId)

      return Storage.update<ListType>(listId, { items })
    },
    removeItem: async (listId: string, itemIdx: number) => {
      if (!listId) {
        throw new Error('Missing List ID')
      }

      if (typeof itemIdx !== 'number') {
        throw new Error('Item index must be a number')
      }

      const list = await Storage.get<ListType>(listId)

      if (!list) {
        throw new Error(`No List with ID ${listId} found`)
      }

      const items = list.items.filter((_: unknown, idx: number) =>
        idx !== itemIdx
      )

      return Storage.update<ListType>(listId, { items })
    },
  }
}
export default List
