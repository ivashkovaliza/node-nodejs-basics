import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
  const fileToCompress = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToCompress.txt');
  const compressedFile = resolve(dirname(fileURLToPath(import.meta.url)), './files/archive.gz');

  try {
    await pipeline(
      fs.createReadStream(fileToCompress),
      zlib.createGzip(),
      fs.createWriteStream(compressedFile),
    )
  } catch (error) {
    console.error(error);
  }
};

await compress();
