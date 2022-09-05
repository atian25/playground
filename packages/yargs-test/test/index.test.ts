import assert from 'assert';
import { run } from '../src/index';

describe('test/index.test.ts', () => {
  it('should yargs', async () => {
    await run('dev --test=1 xx');

    await run('dev client --test=2 aa');
    await run('dev server --test=3 bb');
    await run('dev other --test=4 bb');

    await run('abc --test=1 xx');
  });
});

