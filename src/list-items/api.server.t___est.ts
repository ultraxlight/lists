import {
  assert,
  assertEquals,
  assertThrows,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts'


Deno.test('Call to empty storage returns correct default', async () => {
  const resp = await fetch('http://localhost:8000')
  const responseJson = await resp.json()
  
  assertEquals(responseJson, [])
})
