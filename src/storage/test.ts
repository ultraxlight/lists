import { assertEquals } from 'https://deno.land/std@0.168.0/testing/asserts.ts'
import { create } from './local-storage.ts'

// Deno.test('create', () => {
Deno.test('Empty call creates full object', () => {
  const newLi = create()
  assertEquals(typeof newLi.id, 'string')
  assertEquals(newLi.title, '')
})

Deno.test('Title can be passed', () => {
  const newLi = create('Mow the lawn')
  assertEquals(typeof newLi.id, 'string')
  assertEquals(newLi.title, 'Mow the lawn')
})
// })
