import * as fs from 'fs';
import * as path from 'path';

const tsFilePath = path.resolve(`./index.ts`);

const fileSystemEntriesName = fs.readdirSync(path.resolve(`.`));

if (fileSystemEntriesName.length === 0) {

  if (fs.existsSync(tsFilePath)) {

    fs.unlinkSync(tsFilePath);
  }

} else {

  const indexTs = fileSystemEntriesName
    .filter((fileSystemEntryName) => fileSystemEntryName.endsWith(`.ts`))
    .filter((fileSystemEntryName) => fileSystemEntryName !== `index.ts`)
    .map((fileSystemEntryName) => `export * from './${fileSystemEntryName.substring(0, fileSystemEntryName.length - 3)}';`)
    .join(`\n`) + `\n`;
  
  fs.writeFileSync(
    tsFilePath,
    indexTs,
    `utf-8`,
  );
}
