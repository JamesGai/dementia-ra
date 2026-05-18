// Execute: node src/scripts/deleteSubsections.js --section=2.1

import admin from "firebase-admin";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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
const batchSize = 450;

function parseArgs(argv) {
  const sectionArg = argv.find((arg) => arg.startsWith("--section="));
  const section = sectionArg ? sectionArg.replace("--section=", "") : null;

  if (!section) {
    throw new Error("Missing required argument: --section=module.section");
  }

  const [moduleNumber, sectionNumber] = section.split(".").map(Number);

  if (!Number.isInteger(moduleNumber) || !Number.isInteger(sectionNumber)) {
    throw new Error(`Invalid section "${section}". Expected format like 2.1.`);
  }

  return {
    moduleNumber,
    sectionNumber,
  };
}

function getSubsectionCollection({ moduleNumber, sectionNumber }) {
  return db
    .collection("course")
    .doc(courseId)
    .collection("module")
    .doc(`module-${moduleNumber}`)
    .collection("section")
    .doc(`section-${moduleNumber}.${sectionNumber}`)
    .collection("subsection");
}

async function deleteQueryBatch(query) {
  const snapshot = await query.get();

  if (snapshot.empty) {
    return 0;
  }

  const batch = db.batch();

  for (const doc of snapshot.docs) {
    batch.delete(doc.ref);
  }

  await batch.commit();

  return snapshot.size;
}

async function deleteSubsections(section) {
  const subsectionCol = getSubsectionCollection(section);
  let deletedCount = 0;

  while (true) {
    const query = subsectionCol
      .orderBy(admin.firestore.FieldPath.documentId())
      .limit(batchSize);
    const deletedInBatch = await deleteQueryBatch(query);

    if (deletedInBatch === 0) {
      return deletedCount;
    }

    deletedCount += deletedInBatch;
    console.log(`Deleted ${deletedCount} subsection document(s)...`);
  }
}

async function main() {
  const section = parseArgs(process.argv.slice(2));
  const sectionKey = `${section.moduleNumber}.${section.sectionNumber}`;
  const deletedCount = await deleteSubsections(section);

  console.log(
    `Done deleting ${deletedCount} subsection document(s) from section-${sectionKey}.`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("Delete failed:", err);
  process.exit(1);
});
