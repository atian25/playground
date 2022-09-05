import assert from 'assert';
import { Command } from '../src/index';

describe('test/index.test.ts', () => {
  it('should decorator', () => {
    assert(true);
    const cmd = new Command();
    assert(cmd.args === '111');
  });
});

