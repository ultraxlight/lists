import {
  assertEquals,
  assertRejects,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import List from './mod.ts'
import memoryStorage from 'storage/implementations/memory.ts'

Deno.test('List', async (t) => {
  const db = await memoryStorage.init()
  const li = List(db)

  await t.step('Empty create call throws error', () => {
    // @ts-ignore This is meant to be called incorrectly
    assertRejects(async () => await li.create())
  })

  await t.step('Create returns an object with a title', async () => {
    const newItem = await li.create('Mow the lawn')
    assertEquals(typeof newItem.id, 'string')
    assertEquals(newItem.title, 'Mow the lawn')
  })

  await t.step('Get can retrieve single', async () => {
    const newItem = await li.create('Mow the lawn')
    const retrievedItem = await li.get(newItem.id)
    assertEquals(
      newItem.id,
      retrievedItem && !Array.isArray(retrievedItem) && retrievedItem.id,
    )
    assertEquals(
      newItem.title,
      retrievedItem && !Array.isArray(retrievedItem) && retrievedItem.title,
    )
  })

  await t.step('Get without an ID throws', () => {
    // @ts-ignore This is meant to be called incorrectly
    assertRejects(async () => await li.get())
  })

  await t.step('GetAll can retrieve multiple', async () => {
    const newLi1 = await li.create('Mow the lawn')
    const newLi2 = await li.create('Mow the lawn 2')
    const retrievedLis = await li.getAll()
    const retrievedLi1 = Array.isArray(retrievedLis) &&
      retrievedLis.find((rLi) => rLi.id === newLi1.id)
    const retrievedLi2 = Array.isArray(retrievedLis) &&
      retrievedLis.find((rLi) => rLi.id === newLi2.id)

    assertEquals(
      newLi1.id,
      retrievedLi1 && !Array.isArray(retrievedLi1) && retrievedLi1.id,
    )
    assertEquals(
      newLi2.title,
      retrievedLi2 && !Array.isArray(retrievedLi2) && retrievedLi2.title,
    )
  })

  await t.step('Update updates', async () => {
    const item = await li.create('Mow the lawn 2')
    await li.update(item.id, { title: 'Mow the lawn 3' })
    const retrievedLi = await li.get(item.id)

    assertEquals(
      retrievedLi?.title,
      'Mow the lawn 3',
    )
  })

  await t.step('Update with wrong ID type throws', () => {
    // @ts-ignore This is meant to be called incorrectly
    assertRejects(async () => await li.update({ title: 'name' }))
  })

  await t.step('Update without ID throws', () => {
    // @ts-ignore This is meant to be called incorrectly
    assertRejects(async () => await li.update())
  })

  await t.step('Remove removes', async () => {
    const newItem = await li.create('Mow the lawn')
    const retrievedItemBeforeRemove = await li.get(newItem.id)

    assertEquals(
      !Array.isArray(retrievedItemBeforeRemove) &&
        retrievedItemBeforeRemove?.title,
      'Mow the lawn',
    )

    li.remove(newItem.id)

    assertEquals(await li.get(newItem.id), null)
  })

  await t.step('Remove without ID throws', () => {
    // @ts-ignore This is meant to be called incorrectly
    assertRejects(async () => await li.remove())
  })

  await t.step('remove returns removed', async () => {
    const newItem = await li.create('Mow the lawn')
    const removedItem = await li.remove(newItem.id)

    // @ts-ignore: fine if this doesn't work
    assertEquals(newItem, removedItem)
  })

  await t.step('addItem adds item', async () => {
    const newList = await li.create('Mow the lawn')
    const updatedList = await li.addItem(newList.id, 'new-id')

    // @ts-ignore: fine if this doesn't work
    assertEquals(updatedList.items, ['new-id'])
  })

  await t.step('addItem without listId throws', () => {
    // @ts-ignore: fine if this doesn't work
    assertRejects(async () => await li.addItem())
  })

  await t.step('addItem without itemId throws', () => {
    // @ts-ignore: fine if this doesn't work
    assertRejects(async () => await li.addItem('a'))
  })

  await t.step('addItem throws if no list found', () => {
    // @ts-ignore: fine if this doesn't work
    assertRejects(async () => await li.addItem('a', 'b'))
  })

  await t.step('removeItem removes item', async () => {
    const newList = await li.create('Mow the lawn')
    const updatedList = await li.addItem(newList.id, 'new-id')

    assertEquals(updatedList.items, ['new-id'])

    const clearedList = await li.removeItem(newList.id, 0)

    assertEquals(clearedList.items, [])
  })

  await t.step('removeItem without listId throws', () => {
    // @ts-ignore: fine if this doesn't work
    assertRejects(async () => await li.removeItem())
  })

  await t.step('removeItem without item index throws', () => {
    // @ts-ignore: fine if this doesn't work
    assertRejects(async () => await li.removeItem('a'))
  })

  await t.step('removeItem throws if no list found', () => {
    // @ts-ignore: fine if this doesn't work
    assertRejects(async () => await li.removeItem('nope', 2))
  })
})
