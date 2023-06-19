import { access, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const filesFolder = resolve(dirname(fileURLToPath(import.meta.url)), './files');
  const errorMessage = 'FS operation failed';

  try {
    const isFilesFolderExist = await access(filesFolder).then(() => true).catch(() => false);

    if (!isFilesFolderExist) {
      throw new Error(errorMessage);
    }
    const files = await readdir(filesFolder);
    console.log(files)
  } catch (error) {
    console.error(error);
  }
};

await list();
