
import 'reflect-metadata';

export function DefineCommand(meta = {}) {
  return (target: any) => {
    Reflect.defineMetadata('COMMAND_METADATA', meta, target);
    return target;
  };
}

export function DefineOption(meta = {}) {
  return (target: any, key: string | symbol) => {
    const commandClz = target.constructor;
    Reflect.defineMetadata('OPTIONS_METADATA', meta, commandClz, key);
  }
}


@DefineCommand({
  command: 'dev [baseDir]',
})
export class Command {
  @DefineOption({
    type: 'string',
    description: 'aaa'
  })
  args: string = '111';
}

Reflect.getMetadata('COMMAND_METADATA', Command);

Reflect.getMetadata('OPTIONS_METADATA', Command, 'args');

const a = Reflect.getMetadataKeys(Command);

console.log('aa');
