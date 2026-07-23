#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FORMATS = {
  '4:3': {width: 1440, height: 1080},
  '9:16': {width: 1080, height: 1920},
  '16:9': {width: 1920, height: 1080},
};
const BACKGROUNDS = new Set(['warm-light', 'clean-dark', 'light-grid', 'dark-grid']);
const REFERENCES = {
  'openmontage-hook': {
    video: 'openmontage-hook.mp4',
    videoSha: 'cd6f13666c7a812aa1114f004afc7131c5054a2f418d544d5f60a3788756418b',
    sheet: 'openmontage-hook-contact-sheet.jpg',
    sheetSha: '819b62a4edcd39a55671917a84334c000d124f60b3a7601d9b8f2b6fc1afc952',
  },
  'openmontage-claude-pipeline': {
    video: 'openmontage-claude-pipeline.mp4',
    videoSha: '3af51afa723465e1a074cacdb6a1a21fcce8d35d769d0d70ddb5e4d102f60a3b',
    sheet: 'openmontage-claude-pipeline-contact-sheet.jpg',
    sheetSha: '6f74e579e0f64c134b546e28c92bcbad9c3c68fa6094055dc4b50fa700a5d7de',
  },
  'tsenta-apply-faster': {
    video: 'tsenta-apply-faster.mp4',
    videoSha: 'b1c0a157358288f7abe4d98b1eef1a31277f2da8acaa57e334709372e3cc087d',
    sheet: 'tsenta-apply-faster-contact-sheet.jpg',
    sheetSha: 'eba56cb88bb846ac7655258d96faeb95e88c30c94206e1fbea2337a926585b2e',
  },
  'tsenta-one-click-wall': {
    video: 'tsenta-one-click-wall.mp4',
    videoSha: 'c8ee2b878406f42553acd43ed3cd4fb0de49f0fc2e4450bdeaaa05168122d2d1',
    sheet: 'tsenta-one-click-wall-contact-sheet.jpg',
    sheetSha: '927371a077071145f840cfb44f57c4dfa51d5d175be56ce7c05c50b6c46f1672',
  },
  'kickbacks-same-run-editor': {
    video: 'kickbacks-same-run-editor.mp4',
    videoSha: '046ead08cd510826973e8a020e092239095ab4a414982ffbec7117a4bc515172',
    sheet: 'kickbacks-same-run-editor-contact-sheet.jpg',
    sheetSha: '4d65cc76e13c0032f30207ece0a1660ef65f1ff74fc729d05070dd0de62710b8',
  },
  'smartlead-prewarmed-burn': {
    video: 'smartlead-prewarmed-burn.mp4',
    videoSha: '4513230b6af38e468206ff5659135ae706b26241674e1f0790db8977bd8d12f0',
    sheet: 'smartlead-prewarmed-burn-contact-sheet.jpg',
    sheetSha: 'd28e64ea8687e9046449f919ae1df37e7c2a896f74bc44957df57d137789f34e',
  },
};
const SCORE_KEYS = ['reference_fidelity','concept_specificity','product_authenticity','mobile_readability','composition','motion_causality','material_restraint'];

function die(message) {
  console.error(`GATE BLOCKED: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    if (key === 'asset') {
      out.asset ??= [];
      out.asset.push(value);
    } else out[key] = value;
  }
  return out;
}

function required(args, key, min = 1) {
  const value = args[key];
  if (typeof value !== 'string' || value.trim().length < min) die(`--${key} is required`);
  return value.trim();
}

function pathsFor(projectArg = '.') {
  const project = path.resolve(projectArg);
  const state = path.join(project, '.promptible');
  return {project, state, manifest: path.join(state, 'render-brief.json')};
}

function readJson(file, label) {
  if (!fs.existsSync(file)) die(`${label} not found: ${file}`);
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { die(`${label} is invalid JSON: ${error.message}`); }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function hash(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function verifiedFile(file, expected, label) {
  if (!fs.existsSync(file)) die(`${label} missing: ${file}`);
  const actual = hash(file);
  if (actual !== expected) die(`${label} hash mismatch`);
  return actual;
}

function init(args) {
  const p = pathsFor(args.project);
  const format = required(args, 'format');
  const background = required(args, 'background');
  const referenceId = required(args, 'reference');
  const identity = required(args, 'identity');
  const claimSource = required(args, 'claim-source', 3);
  const beat = required(args, 'beat', 20);
  const duration = Number(required(args, 'duration'));
  if (!FORMATS[format]) die(`--format must be one of ${Object.keys(FORMATS).join(', ')}`);
  if (!BACKGROUNDS.has(background)) die(`--background must be one of ${[...BACKGROUNDS].join(', ')}`);
  if (!REFERENCES[referenceId]) die(`--reference must be one of ${Object.keys(REFERENCES).join(', ')}`);
  if (!['authentic', 'abstract'].includes(identity)) die('--identity must be authentic or abstract');
  if (!Number.isFinite(duration) || duration < 2 || duration > 15) die('--duration must be 2–15 seconds');
  const assets = (args.asset ?? []).map((file) => path.resolve(p.project, file));
  if (identity === 'authentic' && assets.length === 0) die('authentic product work requires at least one --asset');
  for (const asset of assets) if (!fs.existsSync(asset)) die(`authentic asset not found: ${asset}`);

  const ref = REFERENCES[referenceId];
  const referenceVideo = path.join(SKILL_DIR, 'assets', 'references', ref.video);
  const referenceSheet = path.join(SKILL_DIR, 'assets', 'references', ref.sheet);
  const referenceVideoSha = verifiedFile(referenceVideo, ref.videoSha, 'approved reference video');
  const referenceSheetSha = verifiedFile(referenceSheet, ref.sheetSha, 'approved reference contact sheet');
  writeJson(p.manifest, {
    version: 2,
    status: 'REFERENCE_READY',
    createdAt: new Date().toISOString(),
    format,
    dimensions: FORMATS[format],
    background,
    referenceId,
    referenceVideo,
    referenceSheet,
    referenceVideoSha,
    referenceSheetSha,
    identity,
    assets,
    claimSource,
    beat,
    requestedDuration: duration,
  });
  console.log(`REFERENCE READY: ${referenceVideo}`);
  console.log(`CONTACT SHEET READY: ${referenceSheet}`);
  console.log('Build is not authorized. Inspect media and run inspect.');
}

function inspectReference(args) {
  const p = pathsFor(args.project);
  const manifest = readJson(p.manifest, 'render manifest');
  if (!['REFERENCE_READY','BUILD_AUTHORIZED'].includes(manifest.status)) die(`inspect blocked from status ${manifest.status}`);
  verifiedFile(manifest.referenceVideo, manifest.referenceVideoSha, 'approved reference video');
  verifiedFile(manifest.referenceSheet, manifest.referenceSheetSha, 'approved reference contact sheet');
  const observations = path.resolve(p.project, required(args, 'observations'));
  if (!fs.existsSync(observations)) die(`observations not found: ${observations}`);
  const text = fs.readFileSync(observations, 'utf8');
  if (text.trim().length < 400) die('observations require at least 400 characters of visible evidence');
  for (const heading of ['Composition','Camera','Identity','Anti-pattern']) {
    if (!new RegExp(`^## ${heading}\\s*$`, 'mi').test(text)) die(`missing heading: ## ${heading}`);
  }
  manifest.status = 'BUILD_AUTHORIZED';
  manifest.referenceObservations = observations;
  manifest.referenceObservationsSha = hash(observations);
  manifest.referenceInspectedAt = new Date().toISOString();
  writeJson(p.manifest, manifest);
  console.log('BUILD AUTHORIZED');
}

function candidate(args) {
  const p = pathsFor(args.project);
  const manifest = readJson(p.manifest, 'render manifest');
  if (!['BUILD_AUTHORIZED','AWAITING_CRITIC','QA_REJECTED'].includes(manifest.status)) die(`candidate blocked from status ${manifest.status}`);
  const render = path.resolve(p.project, required(args, 'render'));
  const sheet = path.resolve(p.project, required(args, 'contact-sheet'));
  const probeFile = path.resolve(p.project, required(args, 'probe'));
  if (!fs.existsSync(render)) die(`candidate render missing: ${render}`);
  if (!fs.existsSync(sheet)) die(`candidate contact sheet missing: ${sheet}`);
  const probe = readJson(probeFile, 'candidate probe');
  const stream = probe.streams?.[0];
  const width = Number(stream?.width);
  const height = Number(stream?.height);
  const duration = Number(probe.format?.duration);
  if (width !== manifest.dimensions.width || height !== manifest.dimensions.height) die(`candidate dimensions ${width}x${height} do not match ${manifest.dimensions.width}x${manifest.dimensions.height}`);
  if (!Number.isFinite(duration) || Math.abs(duration - manifest.requestedDuration) > 0.25) die(`candidate duration ${duration}s differs from ${manifest.requestedDuration}s`);
  manifest.status = 'AWAITING_CRITIC';
  manifest.candidateRender = render;
  manifest.candidateRenderSha = hash(render);
  manifest.candidateSheet = sheet;
  manifest.candidateSheetSha = hash(sheet);
  manifest.candidateProbe = probeFile;
  manifest.candidateCreatedAt = new Date().toISOString();
  writeJson(p.manifest, manifest);
  console.log('CANDIDATE EVIDENCE READY');
  console.log('Delivery is blocked pending independent critic.');
}

function qa(args) {
  const p = pathsFor(args.project);
  const manifest = readJson(p.manifest, 'render manifest');
  if (!['AWAITING_CRITIC','QA_REJECTED'].includes(manifest.status)) die(`QA blocked from status ${manifest.status}`);
  verifiedFile(manifest.referenceVideo, manifest.referenceVideoSha, 'approved reference video');
  verifiedFile(manifest.referenceSheet, manifest.referenceSheetSha, 'approved reference sheet');
  verifiedFile(manifest.candidateRender, manifest.candidateRenderSha, 'candidate render');
  verifiedFile(manifest.candidateSheet, manifest.candidateSheetSha, 'candidate sheet');
  const criticPath = path.resolve(p.project, required(args, 'critic'));
  const critic = readJson(criticPath, 'critic JSON');
  const failures = [];
  if (critic.critic !== 'independent') failures.push('critic must be independent');
  if (critic.referenceId !== manifest.referenceId) failures.push('critic referenceId mismatch');
  if (critic.verdict !== 'pass') failures.push('critic verdict is not pass');
  if (!Array.isArray(critic.hardFailures)) failures.push('hardFailures must be an array');
  else if (critic.hardFailures.length) failures.push(...critic.hardFailures.map((item) => `hard failure: ${item}`));
  if (!Array.isArray(critic.notes) || critic.notes.length === 0) failures.push('critic notes are required');
  const values = [];
  for (const key of SCORE_KEYS) {
    const value = Number(critic.scores?.[key]);
    if (!Number.isInteger(value) || value < 0 || value > 10) failures.push(`invalid score: ${key}`);
    else {
      values.push(value);
      if (value < 8) failures.push(`${key} below 8 (${value})`);
    }
  }
  const average = values.length === SCORE_KEYS.length ? values.reduce((a,b) => a+b,0) / values.length : 0;
  if (average < 8.5) failures.push(`average below 8.5 (${average.toFixed(2)})`);
  if (failures.length) {
    manifest.status = 'QA_REJECTED';
    manifest.lastQaAt = new Date().toISOString();
    manifest.lastQaFailures = failures;
    writeJson(p.manifest, manifest);
    die(failures.join('; '));
  }
  manifest.status = 'DELIVERY_AUTHORIZED';
  manifest.deliveryAuthorizedAt = new Date().toISOString();
  manifest.critic = criticPath;
  manifest.criticSha = hash(criticPath);
  manifest.scoreAverage = average;
  writeJson(p.manifest, manifest);
  console.log(`DELIVERY AUTHORIZED (average ${average.toFixed(2)})`);
}

const [command, ...rest] = process.argv.slice(2);
const args = parseArgs(rest);
if (!['init','inspect','candidate','qa'].includes(command)) die('usage: promptible-gate.mjs <init|inspect|candidate|qa> [options]');
if (command === 'init') init(args);
if (command === 'inspect') inspectReference(args);
if (command === 'candidate') candidate(args);
if (command === 'qa') qa(args);
