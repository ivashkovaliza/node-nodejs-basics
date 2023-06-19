import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const fileToRead = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToRead.txt');
  const errorMessage = 'FS operation failed';

  try {
    const isFileToReadExist = await access(fileToRead).then(() => true).catch(() => false);

    if (!isFileToReadExist) {
      throw new Error(errorMessage);
    }

    const fileContent = await readFile(fileToRead, 'utf-8');
    console.log(fileContent);
  } catch (error) {
    console.error(error);
  }
};

await read();
