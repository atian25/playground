import yargs from 'yargs';

export async function run(argv?: string) {
  yargs
    .command('$0', 'the default command', () => { }, (argv) => {
      console.log('this command will be run by default', argv)
    })
    .command({
      command: 'dev [baseDir]',
      describe: 'start dev server',
      handler: async function (argv) {
        console.log('dev', argv);
      },
      builder: yargs => {
        return yargs.command({
          command: 'client',
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
    .parse(argv);
}
