import { create, isValid } from './index'

describe('isValid', () => {
  test('Full object validates', () => {
    expect(isValid({ id: '0', title: 'test' })).toBe(true)
  })

  test('Empty object does not validate', () => {
    expect(isValid({})).toBe(false)
  })

  test('Missing `id` does not validate', () => {
    expect(isValid({ title: 'test' })).toBe(false)
  })

  test('Missing `title` does not validate', () => {
    expect(isValid({ id: 'test' })).toBe(false)
  })

  test('Incorrect `id` type does not validate', () => {
    expect(isValid({ id: 4 })).toBe(false)
  })

  test('Incorrect `title` type does not validate', () => {
    expect(isValid({ title: true })).toBe(false)
  })
})

describe('create', () => {
  test('Empty call creates full object', () => {
    const newLi = create()
    expect(typeof newLi.id).toBe('string')
    expect(newLi.title).toBe('')
  })

  test('Title can be passed', () => {
    const newLi = create('Mow the lawn')
    expect(typeof newLi.id).toBe('string')
    expect(newLi.title).toBe('Mow the lawn')
  })
})

