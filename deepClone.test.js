const { deepClone } = require('./deepClone');

/** There are some edge cases that I haven't included. There are at lest 2 more types of pollution
 * that I can think of for which I haven't tested, but I think the scope is to be aware that there's
 * more work involved in creating something really performant and secure. **/

const fa = () => {
  return 'Testing string';
};

const obj = {
  name: 'Cris',
  type: null,
  err: undefined,
  emptyValue: {},
  __proto__: {
    polluted: 'Yes we are',
  },
  child: {
    func: fa,
    childValue: 'Child value',
  },
};
const clone = deepClone(obj);

test('should not have two identical objects', () => {
  expect(clone).not.toBe(obj);
});

test('should clone null value properties', () => {
  expect(obj.type).toBe(clone.type);
});

test('should clone undefined properties', () => {
  expect(obj.err).toBe(clone.err);
});

test('should clone empty objects', () => {
  expect(clone.emptyValue).toEqual({});
});

test('should not change the original object property', () => {
  clone.name = 'Mary';
  expect(obj.name).not.toBe(clone.name);
});

test('should copy over the function references from the original object', () => {
  expect(clone.child.func).toBe(fa);
});

test('should not copy pollution of the parent', () => {
  expect(clone.polluted).toBe(undefined);
});
