import { appendFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const filePath = resolve(dirname(fileURLToPath(import.meta.url)), './files/fresh.txt');
  const fileContent = 'I am fresh and young';
  const errorMessage = 'FS operation failed';

  try {
    const isFileExist = await access(filePath).then(() => true).catch(() => false);

    if (!isFileExist) {
      await appendFile(filePath, fileContent);
    } else {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

await create();
