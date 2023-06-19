import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const fileToWrite = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToWrite.txt');
  try {
    await pipeline(
      process.stdin,
      fs.createWriteStream(fileToWrite),
    )
  } catch (error) {
    console.error(error);
  }
};

await write();
