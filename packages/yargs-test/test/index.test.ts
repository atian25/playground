import assert from 'assert';
import { run } from '../src/index';

describe('test/index.test.ts', () => {
  it('should yargs', async () => {
    await run('dev --test=1 xx yy -- zz ww --a=b');

    // await run('dev --help');

    await run('dev client --test=2 aa');
    await run('dev server  bb');
    await run('dev other --test=4 bb');

    await run('build client --test=5 cc');

    await run('abc --test=1 xx');
  });
});

