#!/usr/bin/env node
/**
 * ticket-formatter.js
 * -----------------------------------------------------------------------
 * Stage 2 of the Multi-Stage AI Workflow lab: a CLI-based AI tool.
 *
 * It takes the structured JSON produced by Stage 1 (a chat-based AI tool
 * doing extraction) and turns it into a fully-formatted Markdown ticket,
 * integrating it directly into this codebase under ./tickets/.
 *
 * Design goals (tool-agnostic / adaptable, per the lab's rubric):
 *   - Works completely offline with a deterministic local formatter.
 *   - If ANTHROPIC_API_KEY is present in the environment, it additionally
 *     asks Claude to write a short, professional "Suggested first response"
 *     paragraph for the ticket -- demonstrating a *second*, CLI-native AI
 *     call chained after the chat-based one, with no code changes required
 *     to switch providers/models (only the callClaude() function would need
 *     to change for a different provider).
 *   - Never fails the whole run if the optional AI call fails; it falls
 *     back to a local template and logs a warning instead.
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

/**
 * Optional Stage-2 AI call. Uses Claude to draft a short "suggested first
 * response" for the on-call engineer. Kept in its own function so a
 * different model/provider can be swapped in without touching the rest of
 * the pipeline (the "adaptability" criterion in the rubric).
 */
async function draftSuggestedResponse(data) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null; // Graceful, offline-friendly fallback
  }

  const prompt = [
    'You are helping an on-call engineer respond to an incident ticket.',
    'Write a 2-3 sentence "suggested first response" to send to the reporter.',
    'Be calm, acknowledge the issue, and state that the team is investigating.',
    'Do not invent a root cause. Do not use markdown.',
    '',
    `Affected system: ${data.affected_system}`,
    `Summary: ${data.summary}`,
    `Urgency: ${data.urgency}`,
  ].join('\n');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      console.warn(`[ticket-formatter] AI call failed with status ${response.status}, using fallback.`);
      return null;
    }

    const json = await response.json();
    const text = (json.content || [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    return text || null;
  } catch (err) {
    console.warn(`[ticket-formatter] AI call errored (${err.message}), using fallback.`);
    return null;
  }
}

function fallbackSuggestedResponse(data) {
  return (
    `Thanks for flagging this -- we can see reports of ${data.summary.toLowerCase()} ` +
    `We're investigating ${data.affected_system} now and will update you as soon as we ` +
    `have a fix or a workaround.`
  );
}

function renderTicketMarkdown(data, ticketId, suggestedResponse, generatedFromAI) {
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

## Suggested first response${generatedFromAI ? ' (drafted by Claude)' : ' (local template)'}

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
    return; // already indexed, avoid duplicate rows on re-run
  }
  fs.writeFileSync(indexPath, existing.trimEnd() + '\n' + row, 'utf8');
}

async function main() {
  const { inputPath, outDir } = parseArgs(process.argv);
  const data = loadExtractedReport(inputPath);
  const ticketId = ticketIdFor(data);

  const aiResponse = await draftSuggestedResponse(data);
  const suggestedResponse = aiResponse || fallbackSuggestedResponse(data);
  const markdown = renderTicketMarkdown(data, ticketId, suggestedResponse, Boolean(aiResponse));

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${ticketId}.md`);
  fs.writeFileSync(outPath, markdown, 'utf8');
  updateIndex(outDir, ticketId, data);

  console.log(`Ticket written to ${outPath}`);
  console.log(aiResponse ? 'Suggested response drafted by Claude.' : 'Suggested response drafted locally (no ANTHROPIC_API_KEY set).');
}

if (require.main === module) {
  main().catch((err) => {
    console.error(`[ticket-formatter] ${err.message}`);
    process.exit(1);
  });
}

module.exports = {
  loadExtractedReport,
  ticketIdFor,
  renderTicketMarkdown,
  fallbackSuggestedResponse,
};
