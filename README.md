# Lists

2 modules, one for list and one for list items.

## Usage Example

```typescript
import List from 'lists/mod.ts'
import ListItem from 'list-items/mod.ts'

// Create List
const newList = await List(Storage).create('new list')

// Create Item
const newItem = await ListItem(ListItemStorage).create({ title: 'new item' })

// Add Item to List
await List(Storage).addItem(newList.id, newItem.id)
```

## Docs

#### Lists

[Module](https://doc.deno.land/https://raw.githubusercontent.com/ultraxlight/lists/main/src/lists/list/mod.ts/~/default)

[Interface](https://doc.deno.land/https://raw.githubusercontent.com/ultraxlight/lists/main/src/lists/list/types.ts/~/ListInterface)

[Object](https://doc.deno.land/https://raw.githubusercontent.com/ultraxlight/lists/main/src/lists/list/types.ts/~/List)

#### Items

[Module](https://doc.deno.land/https://raw.githubusercontent.com/ultraxlight/lists/main/src/list-items/list-item/mod.ts/~/default)

[Interface](https://doc.deno.land/https://raw.githubusercontent.com/ultraxlight/lists/main/src/list-items/list-item/types.ts/~/ListItemInterface)

[Object](https://doc.deno.land/https://raw.githubusercontent.com/ultraxlight/lists/main/src/list-items/list-item/types.ts/~/ListItem)
