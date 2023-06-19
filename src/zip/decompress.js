import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
  const fileToCompress = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToCompress.txt');
  const compressedFile = resolve(dirname(fileURLToPath(import.meta.url)), './files/archive.gz');

  try {
    await pipeline(
      fs.createReadStream(compressedFile),
      zlib.createGunzip(),
      fs.createWriteStream(fileToCompress),
    )
  } catch (error) {
    console.error(error);
  }
};

await decompress();
