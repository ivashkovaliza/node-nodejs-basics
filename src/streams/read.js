import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const fileToRead = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToRead.txt');

  try {
    await pipeline(
      fs.createReadStream(fileToRead),
      process.stdout
    )
  } catch (error) {
    console.error(error);
  }
};

await read();
