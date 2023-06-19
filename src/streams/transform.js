import { pipeline } from 'node:stream/promises';
import { Transform } from 'stream'

const transform = async () => {
  const reverse = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().split('').reverse().join(''));
    },
  });

  try {
    await pipeline(
      process.stdin,
      reverse,
      process.stdout
    )
  } catch (error) {
    console.error(error);
  }
};

await transform();
