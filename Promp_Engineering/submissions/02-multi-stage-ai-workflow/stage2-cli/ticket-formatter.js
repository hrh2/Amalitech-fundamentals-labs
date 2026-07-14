#!/usr/bin/env node
/**
 * ticket-formatter.js
 * -----------------------------------------------------------------------
 * Stage 2 of the Multi-Stage AI Workflow lab: a CLI-based tool.
 *
 * Takes the structured JSON produced by Stage 1 (a chat-based AI tool doing
 * extraction) and turns it into a fully-formatted Markdown ticket,
 * integrating it directly into this codebase under ./tickets/.
 *
 * Usage:
 *   node ticket-formatter.js <path-to-extracted-report.json> [--out <dir>]
 */

const fs = require('fs');
const path = require('path');

const VALID_URGENCY = ['low', 'medium', 'high', 'critical'];

function parseArgs(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    throw new Error('Usage: node ticket-formatter.js <input.json> [--out <dir>]');
  }
  const inputPath = args[0];
  const outIndex = args.indexOf('--out');
  const outDir = outIndex !== -1 ? args[outIndex + 1] : path.join(__dirname, 'tickets');
  return { inputPath, outDir };
}

function loadExtractedReport(inputPath) {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const data = JSON.parse(raw);

  const required = [
    'reporter_email',
    'affected_system',
    'reported_at',
    'summary',
    'symptoms',
    'urgency',
  ];
  const missing = required.filter((key) => !(key in data));
  if (missing.length) {
    throw new Error(`Extracted report is missing required field(s): ${missing.join(', ')}`);
  }
  if (!VALID_URGENCY.includes(data.urgency)) {
    throw new Error(`urgency must be one of: ${VALID_URGENCY.join(', ')}`);
  }
  return data;
}

function ticketIdFor(data) {
  const datePart = (data.reported_at || '').slice(0, 10).replace(/-/g, '');
  const slug = data.affected_system
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `TF-${datePart}-${slug}`.slice(0, 60);
}

function fallbackSuggestedResponse(data) {
  return (
    `Thanks for flagging this -- we can see reports of ${data.summary.toLowerCase()} ` +
    `We're investigating ${data.affected_system} now and will update you as soon as we ` +
    `have a fix or a workaround.`
  );
}

function renderTicketMarkdown(data, ticketId, suggestedResponse) {
  const symptoms = data.symptoms.map((s) => `- ${s}`).join('\n');
  return `# ${ticketId}

| Field | Value |
| --- | --- |
| Reporter | ${data.reporter_email} |
| Affected system | ${data.affected_system} |
| Reported at | ${data.reported_at} |
| Urgency | ${data.urgency.toUpperCase()} |
| Corroborating reports | ${data.corroborating_reports ?? 'n/a'} |
| Deadline | ${data.deadline ?? 'None stated'} |

## Summary

${data.summary}

## Symptoms

${symptoms}

## Suggested first response (local template)

${suggestedResponse}

---
*Generated automatically by \`ticket-formatter.js\` (Stage 2 of the Multi-Stage AI Workflow lab) from Stage 1's extracted JSON.*
`;
}

function updateIndex(outDir, ticketId, data) {
  const indexPath = path.join(outDir, 'INDEX.md');
  const row = `| [${ticketId}](./${ticketId}.md) | ${data.urgency.toUpperCase()} | ${data.affected_system} | ${data.reported_at} |\n`;
  const header = '| Ticket | Urgency | System | Reported at |\n| --- | --- | --- | --- |\n';

  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, `# Ticket Index\n\n${header}${row}`, 'utf8');
    return;
  }

  const existing = fs.readFileSync(indexPath, 'utf8');
  if (existing.includes(`[${ticketId}]`)) {
    return;
  }
  fs.writeFileSync(indexPath, existing.trimEnd() + '\n' + row, 'utf8');
}

function main() {
  const { inputPath, outDir } = parseArgs(process.argv);
  const data = loadExtractedReport(inputPath);
  const ticketId = ticketIdFor(data);
  const suggestedResponse = fallbackSuggestedResponse(data);
  const markdown = renderTicketMarkdown(data, ticketId, suggestedResponse);

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${ticketId}.md`);
  fs.writeFileSync(outPath, markdown, 'utf8');
  updateIndex(outDir, ticketId, data);

  console.log(`Ticket written to ${outPath}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(`[ticket-formatter] ${err.message}`);
    process.exit(1);
  }
}

module.exports = {
  loadExtractedReport,
  ticketIdFor,
  renderTicketMarkdown,
  fallbackSuggestedResponse,
};
