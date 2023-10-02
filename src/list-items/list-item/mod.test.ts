import {
  assertEquals,
  assertThrows,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import ListItem from './mod.ts'

Deno.test('Empty create call throws error', () => {
  // @ts-ignore This is meant to be called incorrectly
  assertThrows(() => ListItem.create(), Error, 'Missing title')
})

Deno.test('Create returns an object with a title', () => {
  const newItem = ListItem.create('Mow the lawn')
  assertEquals(typeof newItem.id, 'string')
  assertEquals(newItem.title, 'Mow the lawn')
})

Deno.test('Get can retrieve single', () => {
  const newItem = ListItem.create('Mow the lawn')
  const retrievedItem = ListItem.get(newItem.id)
  assertEquals(
    newItem.id,
    retrievedItem && !Array.isArray(retrievedItem) && retrievedItem.id
  )
  assertEquals(
    newItem.title,
    retrievedItem && !Array.isArray(retrievedItem) && retrievedItem.title
  )
})

Deno.test('GetAll can retrieve multiple', () => {
  const newLi1 = ListItem.create('Mow the lawn')
  const newLi2 = ListItem.create('Mow the lawn 2')
  const retrievedLis = ListItem.getAll()
  const retrievedLi1 =
    Array.isArray(retrievedLis) &&
    retrievedLis.find((rLi) => rLi.id === newLi1.id)
  const retrievedLi2 =
    Array.isArray(retrievedLis) &&
    retrievedLis.find((rLi) => rLi.id === newLi2.id)

  assertEquals(
    newLi1.id,
    retrievedLi1 && !Array.isArray(retrievedLi1) && retrievedLi1.id
  )
  assertEquals(
    newLi2.title,
    retrievedLi2 && !Array.isArray(retrievedLi2) && retrievedLi2.title
  )
})

Deno.test('remove removes', () => {
  const newItem = ListItem.create('Mow the lawn')
  const retrievedItemBeforeRemove = ListItem.get(newItem.id)

  assertEquals(
    !Array.isArray(retrievedItemBeforeRemove) &&
      retrievedItemBeforeRemove?.title,
    'Mow the lawn'
  )

  ListItem.remove(newItem.id)

  assertEquals(ListItem.get(newItem.id), null)
})

Deno.test('remove returns removed', () => {
  const newItem = ListItem.create('Mow the lawn')
  const removedItem = ListItem.remove(newItem.id)

  // @ts-ignore: fine if this doesn't work
  assertEquals(newItem, removedItem)
})
