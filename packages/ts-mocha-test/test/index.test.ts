import assert from 'assert';
import { Command } from '../src/index';

describe('test/index.test.ts', () => {
  it('should work', () => {
    assert(true);
    const cmd = new Command();
    assert(cmd.args === '111');
  });
});

