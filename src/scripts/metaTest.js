import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.resolve(__dirname, '../../.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local not found');
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

const TOKEN = process.env.META_TEST_ACCESS_TOKEN;
const BASE  = 'https://graph.facebook.com/v19.0';
const REPEAT = 5;

if (!TOKEN) {
  console.error('META_TEST_ACCESS_TOKEN is not set in .env.local');
  process.exit(1);
}

const masked = TOKEN.slice(0, 12) + '...' + TOKEN.slice(-6);
console.log(`\n${'═'.repeat(60)}`);
console.log(' Meta API Test Runner');
console.log(`${'═'.repeat(60)}`);
console.log(` Token : ${masked}`);
console.log(` Repeat: ${REPEAT}x per endpoint`);
console.log(`${'═'.repeat(60)}\n`);

async function call(url, params = {}) {
  try {
    const { data } = await axios.get(url, {
      params: { access_token: TOKEN, ...params },
    });
    return { ok: true, data };
  } catch (err) {
    const meta = err.response?.data?.error;
    return { ok: false, error: meta ?? err.message };
  }
}

function printResult(label, attempt, result) {
  const ok    = result.ok;
  const color = ok ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  if (ok) {
    const preview = JSON.stringify(result.data).slice(0, 90);
    console.log(`  ${color}✓${reset} [${attempt}] ${label}`);
    console.log(`      ${preview}${preview.length === 90 ? '…' : ''}`);
  } else {
    const msg = typeof result.error === 'object'
      ? `(${result.error.code}) ${result.error.message}`
      : result.error;
    console.log(`  ${color}✗${reset} [${attempt}] ${label}`);
    console.log(`      Error: ${msg}`);
  }
}

async function runEndpoint(label, url, params = {}) {
  console.log(`\n── ${label}`);
  console.log(`   ${url}`);
  console.log('   ' + '─'.repeat(50));
  const results = [];
  for (let i = 1; i <= REPEAT; i++) {
    const result = await call(url, params);
    printResult(label, i, result);
    results.push(result);
    if (i < REPEAT) await new Promise(r => setTimeout(r, 400));
  }
  const passed = results.filter(r => r.ok).length;
  console.log(`\n   → ${passed}/${REPEAT} calls succeeded`);
  return results;
}

async function main() {
  const summary = [];

  // 1. User profile — public_profile
  const r1 = await runEndpoint(
    'User Profile',
    `${BASE}/me`,
    { fields: 'id,name,email' }
  );
  summary.push({ label: 'User Profile', passed: r1.filter(r => r.ok).length });

  // 2. Pages list — pages_show_list
  const r2 = await runEndpoint(
    'Pages List',
    `${BASE}/me/accounts`
  );
  summary.push({ label: 'Pages List', passed: r2.filter(r => r.ok).length });

  // 3. Business assets — business_management
  const r3 = await runEndpoint(
    'Business Assets',
    `${BASE}/me/businesses`
  );
  summary.push({ label: 'Business Assets', passed: r3.filter(r => r.ok).length });

  // 4. Ad accounts — ads_management / business_management
  const r4 = await runEndpoint(
    'Ad Accounts',
    `${BASE}/me/adaccounts`,
    { fields: 'id,name,account_status,currency' }
  );
  summary.push({ label: 'Ad Accounts', passed: r4.filter(r => r.ok).length });

  const total = summary.length * REPEAT;
  const passed = summary.reduce((s, r) => s + r.passed, 0);

  console.log(`\n${'═'.repeat(60)}`);
  console.log(' Summary');
  console.log(`${'═'.repeat(60)}`);
  for (const s of summary) {
    const bar    = '█'.repeat(s.passed) + '░'.repeat(REPEAT - s.passed);
    const icon   = s.passed === REPEAT ? '\x1b[32m✓\x1b[0m' : '\x1b[33m!\x1b[0m';
    console.log(` ${icon} ${s.label.padEnd(20)} ${bar}  ${s.passed}/${REPEAT}`);
  }
  console.log(`${'─'.repeat(60)}`);
  console.log(` Total calls made : ${total}`);
  console.log(` Calls succeeded  : ${passed}`);
  console.log(` Calls failed     : ${total - passed}`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch(err => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
