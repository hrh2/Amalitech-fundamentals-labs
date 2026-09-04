'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { validate } = require('../lib/validator');

test('passes when data matches schema (type, required, properties)', () => {
  const schema = {
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: { type: 'string' },
      age: { type: 'integer' },
    },
  };
  const data = { name: 'Ada', age: 30 };

  const errors = validate(data, schema);

  assert.deepEqual(errors, []);
});

test('fails when a required property is missing', () => {
  const schema = {
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: { type: 'string' },
      age: { type: 'integer' },
    },
  };
  const data = { name: 'Ada' };

  const errors = validate(data, schema);

  assert.equal(errors.length, 1);
  assert.match(errors[0], /missing required property "age"/);
});

test('fails when a property has the wrong type', () => {
  const schema = {
    type: 'object',
    properties: {
      age: { type: 'integer' },
    },
  };
  const data = { age: 'thirty' };

  const errors = validate(data, schema);

  assert.equal(errors.length, 1);
  assert.match(errors[0], /expected type integer, got string/);
});
