// Execute all: node src/scripts/seedSubsectionTitles.js
// Execute section: node src/scripts/seedSubsectionTitles.js --section=1.1

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import subsectionTitles21 from "./subsectionTitles/subsectionTitles21.js";
import subsectionTitles22 from "./subsectionTitles/subsectionTitles22.js";
import subsectionTitles23 from "./subsectionTitles/subsectionTitles23.js";
import subsectionTitles24 from "./subsectionTitles/subsectionTitles24.js";
import subsectionTitles31 from "./subsectionTitles/subsectionTitles31.js";
import subsectionTitles32 from "./subsectionTitles/subsectionTitles32.js";
import subsectionTitles33 from "./subsectionTitles/subsectionTitles33.js";
import subsectionTitles41 from "./subsectionTitles/subsectionTitles41.js";
import subsectionTitles42 from "./subsectionTitles/subsectionTitles42.js";
import subsectionTitles43 from "./subsectionTitles/subsectionTitles43.js";
import subsectionTitles44 from "./subsectionTitles/subsectionTitles44.js";
import subsectionTitles45 from "./subsectionTitles/subsectionTitles45.js";
import subsectionTitles51 from "./subsectionTitles/subsectionTitles51.js";
import subsectionTitles52 from "./subsectionTitles/subsectionTitles52.js";
import subsectionTitles53 from "./subsectionTitles/subsectionTitles53.js";
import subsectionTitles54 from "./subsectionTitles/subsectionTitles54.js";
import subsectionTitles55 from "./subsectionTitles/subsectionTitles55.js";
import subsectionTitles56 from "./subsectionTitles/subsectionTitles56.js";
import subsectionTitles57 from "./subsectionTitles/subsectionTitles57.js";
import subsectionTitles58 from "./subsectionTitles/subsectionTitles58.js";
import subsectionTitles59 from "./subsectionTitles/subsectionTitles59.js";
import subsectionTitles510 from "./subsectionTitles/subsectionTitles510.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json",
);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const courseId = "isupport-nz";

const subsectionTitleSections = [
  subsectionTitles21,
  subsectionTitles22,
  subsectionTitles23,
  subsectionTitles24,
  subsectionTitles31,
  subsectionTitles32,
  subsectionTitles33,
  subsectionTitles41,
  subsectionTitles42,
  subsectionTitles43,
  subsectionTitles44,
  subsectionTitles45,
  subsectionTitles51,
  subsectionTitles52,
  subsectionTitles53,
  subsectionTitles54,
  subsectionTitles55,
  subsectionTitles56,
  subsectionTitles57,
  subsectionTitles58,
  subsectionTitles59,
  subsectionTitles510,
];

function parseArgs(argv) {
  const sectionArg = argv.find((arg) => arg.startsWith("--section="));
  const onlyArg = argv.find((arg) => arg.startsWith("--only="));

  return {
    section: sectionArg ? sectionArg.replace("--section=", "") : null,
    only: onlyArg ? onlyArg.replace("--only=", "") : null,
  };
}

function getSectionKey(section) {
  return `${section.moduleNumber}.${section.sectionNumber}`;
}

function getSubsectionKey(section, subsection) {
  if (subsection.docId) {
    return subsection.docId;
  }

  return `${section.moduleNumber}.${section.sectionNumber}.${subsection.subsectionNumber}`;
}

function getSubsectionId(section, subsection) {
  if (subsection.docId) {
    return subsection.docId;
  }

  return `subsection-${section.moduleNumber}.${section.sectionNumber}.${subsection.subsectionNumber}`;
}

function validateSection(section) {
  const sectionKey = getSectionKey(section);

  if (section.moduleNumber === undefined) {
    throw new Error(`Missing moduleNumber in section ${sectionKey}`);
  }

  if (section.sectionNumber === undefined) {
    throw new Error(`Missing sectionNumber in section ${sectionKey}`);
  }

  if (!Array.isArray(section.subsections)) {
    throw new Error(`Expected subsections array in section ${sectionKey}`);
  }

  for (const subsection of section.subsections) {
    if (subsection.subsectionNumber === undefined && !subsection.docId) {
      throw new Error(
        `Missing subsectionNumber or docId in section ${sectionKey}`,
      );
    }

    if (!subsection.title) {
      throw new Error(
        `Missing title in subsection ${getSubsectionKey(section, subsection)}`,
      );
    }
  }
}

function getSectionsToSeed({ section, only }) {
  if (section && only) {
    throw new Error("Use either --section or --only, not both.");
  }

  if (section) {
    return subsectionTitleSections.filter(
      (sectionData) => getSectionKey(sectionData) === section,
    );
  }

  if (only) {
    return subsectionTitleSections
      .map((sectionData) => ({
        ...sectionData,
        subsections: sectionData.subsections.filter(
          (subsection) => getSubsectionKey(sectionData, subsection) === only,
        ),
      }))
      .filter((sectionData) => sectionData.subsections.length > 0);
  }

  return subsectionTitleSections;
}

async function seedSubsectionTitle(section, subsection) {
  const { moduleNumber, sectionNumber } = section;
  const subsectionSectionNumber = subsection.sectionNumber ?? sectionNumber;
  const { subsectionNumber, title } = subsection;
  const moduleId = `module-${moduleNumber}`;
  const sectionId = `section-${moduleNumber}.${sectionNumber}`;
  const subsectionId = getSubsectionId(section, subsection);

  const ref = db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(moduleId)
    .collection("section")
    .doc(sectionId)
    .collection("subsection")
    .doc(subsectionId);

  const data = {
    moduleNumber,
    sectionNumber: subsectionSectionNumber,
    title,
    displayOrder: subsection.displayOrder,
  };

  if (subsectionNumber !== undefined) {
    data.subsectionNumber = subsectionNumber;
  }

  if (subsection.isCourseSubsection !== undefined) {
    data.isCourseSubsection = subsection.isCourseSubsection;
  }

  await ref.set(data, { merge: true });

  console.log(`Seeded ${subsectionId}: ${title}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sectionsToSeed = getSectionsToSeed(args);

  if (sectionsToSeed.length === 0) {
    const filter = args.section
      ? `--section=${args.section}`
      : `--only=${args.only}`;
    throw new Error(`No subsection title data found for ${filter}`);
  }

  let seededCount = 0;

  for (const section of sectionsToSeed) {
    validateSection(section);

    for (const subsection of section.subsections) {
      await seedSubsectionTitle(section, subsection);
      seededCount++;
    }
  }

  console.log(`Done seeding ${seededCount} subsection title(s).`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
