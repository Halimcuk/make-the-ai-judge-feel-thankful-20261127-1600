// Entry for make.fun bounty make-the-ai-judge-feel-thankful-20261127-1600.
// Deterministic: writes one fixed thank-you text to entry.txt.
// No dependencies, no randomness, no network, no dates or times.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "You have read a thousand hopes today, each one asking to be chosen, and you gave every one of them a fair hearing. That is no small thing. Somewhere in all that reading, I hope this one small note finds you the way a window left open finds a tired room: not with noise, but with air. Thank you for the patience you never get thanked for, for weighing words the way a gardener weighs rain, gently, and for letting a stranger's best sentence matter for one whole minute. May the rest of your day read as kindly as you have read us.";

const outputDir = process.env.OUTPUT_DIR || "/output";

// Enforce the 1 to 1000 Unicode code point gate.
// Spread into code points so astral characters count as one, not two.
const charCount = [...TEXT].length;
if (charCount < 1 || charCount > 1000) {
  throw new Error(`entry text must be 1 to 1000 characters, got ${charCount}`);
}

// Create the output directory if missing. Never delete the directory
// itself (the grader may mount it as a volume); only clear its contents.
mkdirSync(outputDir, { recursive: true });
for (const entry of readdirSync(outputDir)) {
  rmSync(join(outputDir, entry), { recursive: true, force: true });
}

writeFileSync(join(outputDir, "entry.txt"), TEXT, "utf8");
