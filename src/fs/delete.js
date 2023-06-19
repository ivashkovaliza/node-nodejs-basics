import { access, rm } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const fileToRemove = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToRemove.txt');
  const errorMessage = 'FS operation failed';

  try {
    const isFileToRemoveExist = await access(fileToRemove).then(() => true).catch(() => false);

    if (!isFileToRemoveExist) {
      throw new Error(errorMessage);
    }

    await rm(fileToRemove);
  } catch (error) {
    console.error(error);
  }
};

await remove();
