import { assertEquals } from 'https://deno.land/std@0.171.0/testing/asserts.ts'
import { isValid } from './validation.ts'

Deno.test('Full object validates', () => {
  assertEquals(isValid({ id: '0', title: 'Deno.test' }), true)
})

Deno.test('Empty object does not validate', () => {
  assertEquals(isValid({}), false)
})

Deno.test('Missing `id` does not validate', () => {
  assertEquals(isValid({ title: 'Deno.test' }), false)
})

Deno.test('Missing `title` does not validate', () => {
  assertEquals(isValid({ id: 'Deno.test' }), false)
})

Deno.test('Incorrect `id` type does not validate', () => {
  assertEquals(isValid({ id: 4 }), false)
})

Deno.test('Incorrect `title` type does not validate', () => {
  assertEquals(isValid({ title: true }), false)
})
