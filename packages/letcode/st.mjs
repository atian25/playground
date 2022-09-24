import { pipeline } from "stream/promises";
import fs, { promises as fsPromises } from "fs";

async function cp(src, dist) {
  const len = await fsPromises.stat(src).then((stat) => stat.size);

  await pipeline(
    fs.createReadStream(src, { highWaterMark: 100 }),

    async function* showProgress(source) {
      let count = 0;
      source.setEncoding('utf8');
      for await (const chunk of source) {
        count += chunk.length;
        console.log(`>>> ${Math.floor(count / len * 100)}%, ${count}/${len} bytes read`);
        yield chunk;
      }
    },

    fs.createWriteStream(dist),
  );
}

await cp('package.json', 'package.json.out');
