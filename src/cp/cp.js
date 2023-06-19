import { spawn } from 'node:child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const pathToScript = resolve(dirname(fileURLToPath(import.meta.url)), './files/script.js')
  spawn(process.execPath, [pathToScript, ...args], { stdio: 'inherit' });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 'test']);
