import { access, rename as fileRename } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const wrongFilename = resolve(dirname(fileURLToPath(import.meta.url)), './files/wrongFilename.txt');
  const properFilename = resolve(dirname(fileURLToPath(import.meta.url)), './files/properFilename.txt');
  const errorMessage = 'FS operation failed';

  try {
    const isWrongFilenameExist = await access(wrongFilename).then(() => true).catch(() => false);
    const isProperFilenameExist = await access(properFilename).then(() => true).catch(() => false);

    if (!isWrongFilenameExist || isProperFilenameExist) {
      throw new Error(errorMessage);
    }
    await fileRename(wrongFilename, properFilename);
  } catch (error) {
    console.error(error);
  }
};

await rename();
