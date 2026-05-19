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

## Course subsection content

Upload all content (course content, activity, review)

```sh
node src/scripts/seedSubsectionContent.js
```

Upload course content to specified subsection

```sh
node src/scripts/seedSubsectionContent.js --subsection=<module>.<section>.<subsection>
```

Upload introduction content to specified introduction document

```sh
node src/scripts/seedSubsectionContent.js --introduction=<module>.<section>.<introduction>
```

Upload activity content to specified activity document

```sh
node src/scripts/seedSubsectionContent.js --activity=<module>.<section>.<activity>
```

Upload review content to specified review document

```sh
node src/scripts/seedSubsectionContent.js --review=<module>.<section>.<review>
```

## Delete subsections in a section

Delete all subsection documents to specified section

```sh
node src/scripts/deleteSubsections.js --section=<module>.<section>
```
