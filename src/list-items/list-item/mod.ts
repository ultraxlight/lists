import StorageType from 'https://denopkg.com/ultraxlight/storage@0.3.1/src/types.ts'
import { ListItem as ListItemType } from './types.ts'

/** Basic ListItem functionality */
function ListItem(Storage: StorageType) {
  return {
    create: (item: Partial<ListItemType> & { title: string }) => {
      if (!item || !item.title) {
        return Promise.reject('Missing title')
      }

      const dflt = {
        is_done: false,
      }

      return Storage.create<ListItemType>({ ...dflt, ...item })
    },
    get: (id: string) => {
      if (!id) {
        throw new TypeError('Missing ID')
      }

      return Storage.get<ListItemType>(id)
    },
    getAll: () => {
      return Storage.getAll<ListItemType>()
    },
    update: (id: string, updateObj: Partial<ListItemType>) => {
      if (!id) {
        throw new TypeError('Missing ID')
      }

      if (typeof id !== 'string') {
        throw new TypeError('ID should be string')
      }

      return Storage.update<ListItemType>(id, updateObj)
    },
    remove: (id: string) => {
      if (!id) {
        throw new TypeError('Missing ID')
      }

      return Storage.remove<ListItemType>(id)
    },
  }
}

export default ListItem
