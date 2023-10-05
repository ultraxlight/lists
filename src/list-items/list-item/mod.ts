import Storage from 'https://denopkg.com/ultraxlight/storage@main/implementations/memory.ts'
import {ListItem as ListItemType} from './types.ts'

const ListItem = {
  create: (title: string) => {
    if (!title) {
      throw new TypeError('Missing title')
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

    return Storage.update<ListItemType>(id, updateObj)
  },
  remove: (id: string) => {
    if (!id) {
      throw new TypeError('Missing ID')
    }

    return Storage.remove<ListItemType>(id)
  },
}
export default ListItem
