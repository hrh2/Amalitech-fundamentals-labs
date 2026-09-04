'use strict';

const TYPE_CHECKS = {
  string: (v) => typeof v === 'string',
  number: (v) => typeof v === 'number' && !Number.isNaN(v),
  integer: (v) => typeof v === 'number' && Number.isInteger(v),
  boolean: (v) => typeof v === 'boolean',
  object: (v) => typeof v === 'object' && v !== null && !Array.isArray(v),
  array: (v) => Array.isArray(v),
  null: (v) => v === null,
};

/**
 * Validate `data` against a minimal JSON Schema subset supporting
 * type, required, and properties (recursively for nested objects).
 * Returns an array of human-readable error strings; empty array means valid.
 */
function validate(data, schema, path = '$') {
  const errors = [];

  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matches = types.some((type) => {
      const check = TYPE_CHECKS[type];
      return check ? check(data) : true;
    });
    if (!matches) {
      errors.push(`${path}: expected type ${types.join(' or ')}, got ${describeType(data)}`);
      return errors;
    }
  }

  if (schema.required && Array.isArray(schema.required)) {
    if (TYPE_CHECKS.object(data)) {
      for (const key of schema.required) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          errors.push(`${path}: missing required property "${key}"`);
        }
      }
    }
  }

  if (schema.properties && TYPE_CHECKS.object(data)) {
    for (const [key, subSchema] of Object.entries(schema.properties)) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        errors.push(...validate(data[key], subSchema, `${path}.${key}`));
      }
    }
  }

  if (schema.items && TYPE_CHECKS.array(data)) {
    data.forEach((item, index) => {
      errors.push(...validate(item, schema.items, `${path}[${index}]`));
    });
  }

  return errors;
}

function describeType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

module.exports = { validate };
