import yargs from 'yargs';

export async function run(argv?: string) {
  yargs
    .command('$0', 'the default command', () => { }, (argv) => {
      console.log('this command will be run by default', argv)
    })
    .command({
      command: 'dev [baseDir] [other]',
      describe: 'start dev server',
      handler: async function (argv) {
        console.log('dev', argv);
      },
      builder: yargs => {
        console.log(yargs, yargs.argv)
        return yargs
          .option('test', {
            type: 'string',
            description: 'this is a test',
            default: '1',
          })
          .command({
            command: 'client',
            describe: 'this is dev client',
            builder: yargs => {
              console.log('@@', yargs, yargs.argv, '\n----')
              return yargs.option('client-name', { type: 'string', default: 'abc' });
            },
            handler: argv => { console.log('client', argv); },
          })
          .command(
            {
              command: 'server',
              handler: argv => { console.log('server', argv); },
            },
          );
      }
    })
    .command({
      command: 'build client [baseDir]',
      handler: argv => { console.log('build client', argv); },
    })
    .parse(argv);
}
