import crypto from 'crypto';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const fileToRead = resolve(dirname(fileURLToPath(import.meta.url)), './files/fileToCalculateHashFor.txt');

  try {
    const fileContent = await readFile(fileToRead, 'utf-8');
    console.log(crypto.createHash('sha256').update(fileContent).digest('hex'));
  } catch (error) {
    console.error(error);
  }
};

await calculateHash();
