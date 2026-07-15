// ticket-formatter.test.js
// Lightweight smoke test (no framework dependency).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  loadExtractedReport,
  ticketIdFor,
  renderTicketMarkdown,
  fallbackSuggestedResponse,
} = require('./ticket-formatter');

const sampleInputPath = path.join(__dirname, '..', 'stage1-chat', 'extracted-report.json');

(function run() {
  const data = loadExtractedReport(sampleInputPath);
  assert.strictEqual(data.urgency, 'critical');

  const id = ticketIdFor(data);
  assert.ok(id.startsWith('TF-20260714'), `unexpected ticket id: ${id}`);

  const response = fallbackSuggestedResponse(data);
  assert.ok(response.length > 0);

  const markdown = renderTicketMarkdown(data, id, response, false);
  assert.ok(markdown.includes(id));
  assert.ok(markdown.includes('CRITICAL'));
  assert.ok(markdown.includes(data.reporter_email));

  // Missing required field should throw
  const tmp = path.join(__dirname, '_tmp-bad-input.json');
  fs.writeFileSync(tmp, JSON.stringify({ reporter_email: 'a@b.com' }));
  assert.throws(() => loadExtractedReport(tmp), /missing required field/);
  fs.unlinkSync(tmp);

  console.log('All ticket-formatter tests passed.');
})();
