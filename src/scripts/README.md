# Seed scripts

These scripts upload all resources to Firebase. Keep `serviceAccountKey.json` in the project root before
running any seed script.

## Videos

Upload all video data (not video objects)

```sh
node src/scripts/seedVideos.js
```

## Services

Upload all medical centre data

```sh
node src/scripts/seedServices.js
```

## Course Module and section

Upload all course module and section data

```sh
node src/scripts/seedModulesAndSections.js
```

## Course subsection titles

Upload all subsection titles

```sh
node src/scripts/seedSubsectionTitles.js
```

Upload subsection titles in specified section

```sh
node src/scripts/seedSubsectionTitles.js --section=<module>.<section>
```

## Course subsection content

Upload all subsection content

```sh
node src/scripts/seedSubsectionContent.js
```

Upload subsection content in specified subsection

```sh
node src/scripts/seedSubsectionContent.js --only=<module>.<section>.<subsection>
```

Upload introduction subsection content only

```sh
node src/scripts/seedSubsectionContent.js --introductions
```

## Delete subsections in a section

Delete all subsection documents in specified section

```sh
node src/scripts/deleteSubsections.js --section=<module>.<section>
```
