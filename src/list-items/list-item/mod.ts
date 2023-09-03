import Storage from 'https://denopkg.com/ultraxlight/storage@main/src/local-storage.ts'

const ListItem = {
  ...Storage,
  create: (title: string) => {
    if (!title) {
      throw new TypeError('Missing title')
    }

    return Storage.create({ title })
  },
}
export default ListItem
