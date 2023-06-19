import { readdir, copyFile, access, mkdir } from 'node:fs/promises';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const sourceFolder = resolve(dirname(fileURLToPath(import.meta.url)), './files');
  const destinationFolder = resolve(dirname(fileURLToPath(import.meta.url)), './files_copy');
  const errorMessage = 'FS operation failed';

  try {
    const isSourceFolderExist = await access(sourceFolder).then(() => true).catch(() => false);
    const isDestinationFolderExist = await access(destinationFolder).then(() => true).catch(() => false);

    if (!isSourceFolderExist || isDestinationFolderExist) {
      throw new Error(errorMessage);
    }
    const files = await readdir(sourceFolder);
    await mkdir(destinationFolder);

    for (const file of files) {
      const sourceFilePath = path.join(sourceFolder, file);
      const destinationFilePath = path.join(destinationFolder, file);

      await copyFile(sourceFilePath, destinationFilePath);
    }
  } catch (error) {
    console.error(error);
  }
};

await copy();
