const {isValid} = require('./index.ts');

test('Full object validates', () => {
  expect(isValid({id:'0', title: 'test'})).toBe(true);
});

test('Empty object does not validate', () => {
  expect(isValid({})).toBe(false);
});

test('Missing `id` does not validate', () => {
  expect(isValid({title: 'test'})).toBe(false);
});

test('Missing `title` does not validate', () => {
  expect(isValid({id: 'test'})).toBe(false);
});

test('Incorrect `id` type does not validate', () => {
  expect(isValid({id: 4})).toBe(false);
});

test('Incorrect `title` type does not validate', () => {
  expect(isValid({title: true})).toBe(false);
});