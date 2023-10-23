import StorageType from 'https://denopkg.com/ultraxlight/storage@0.2.0/src/types.ts'
import { ListItem as ListItemType } from './types.ts'

/** Basic ListItem functionality */
function ListItem(Storage: StorageType) {
  return {
    create: (title: string) => {
      if (!title) {
        return Promise.reject('Missing title')
      }

      return Storage.create<ListItemType>({ title })
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
