import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const workerFilePath = `${dirname(fileURLToPath(import.meta.url))}/worker.js`;
  const numThreads = cpus().length;
  const promises = [];

  for (let i = 0; i < numThreads; i++) {
    promises.push(new Promise((resolve, reject) => {
      const worker = new Worker(workerFilePath);

      worker.postMessage(10 + i);
      worker.on('message', (message) => {
        resolve({ status: 'resolved', data: message })
      });
      worker.on('error', () => {
        reject({ status: 'error', data: null })
      })
    }));
  }

  Promise.allSettled(promises).then((results) => {
    console.log(results.map(item => item.value || item.reason));
  });
};

await performCalculations();
