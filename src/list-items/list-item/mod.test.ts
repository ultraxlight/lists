import {
  assertEquals,
  assertRejects,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import ListItem from './mod.ts'
import memoryStorage from 'storage/implementations/memory.ts'

Deno.test('ListItem', async (t) => {
  const db = await memoryStorage.init()
  const li = ListItem(db)

  await t.step('Empty create call throws error', () => {
    // @ts-ignore This is meant to be called incorrectly
    assertRejects(async () => await li.create())
  })

  await t.step('Create returns a list item with defaults', async () => {
    const newItem = await li.create({ title: 'Mow the lawn' })
    assertEquals(typeof newItem.id, 'string')
    assertEquals(newItem.title, 'Mow the lawn')
    assertEquals(newItem.is_done, false)
    assertEquals(Object.keys(newItem).length, 3)
  })

  await t.step('Create returns accepts passed in arguements', async () => {
    const newItem = await li.create({ title: 'Mow the lawn', is_done: true })
    assertEquals(newItem.title, 'Mow the lawn')
    assertEquals(newItem.is_done, true)
  })

  await t.step('Get can retrieve single', async () => {
    const newItem = await li.create({ title: 'Mow the lawn' })
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
    const newLi1 = await li.create({ title: 'Mow the lawn' })
    const newLi2 = await li.create({ title: 'Mow the lawn 2' })
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
    const item = await li.create({ title: 'Mow the lawn 2' })
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
    const newItem = await li.create({ title: 'Mow the lawn' })
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
    const newItem = await li.create({ title: 'Mow the lawn' })
    const removedItem = await li.remove(newItem.id)

    // @ts-ignore: fine if this doesn't work
    assertEquals(newItem, removedItem)
  })
})
