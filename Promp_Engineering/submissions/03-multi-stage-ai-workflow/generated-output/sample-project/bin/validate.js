#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { validate } = require('../lib/validator');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function main(argv) {
  const [dataPath, schemaPath] = argv;

  if (!dataPath || !schemaPath) {
    console.error('Usage: validate <data.json> <schema.json>');
    process.exit(1);
  }

  let data;
  let schema;

  try {
    data = readJson(path.resolve(dataPath));
  } catch (err) {
    console.error(`FAIL\nCould not read/parse data file "${dataPath}": ${err.message}`);
    process.exit(1);
  }

  try {
    schema = readJson(path.resolve(schemaPath));
  } catch (err) {
    console.error(`FAIL\nCould not read/parse schema file "${schemaPath}": ${err.message}`);
    process.exit(1);
  }

  const errors = validate(data, schema);

  if (errors.length === 0) {
    console.log('PASS');
    process.exit(0);
  } else {
    console.log('FAIL');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { main };
