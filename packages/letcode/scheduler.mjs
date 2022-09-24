class Scheduler {
  #limit = 10;
  #tasks = [];
  #current = 0;

  constructor(limit) {
    this.#limit = limit;
  }

  add(params, handler) {
    this.#tasks.push({
      params,
      handler
    });

    this.run();
  }

  run() {
    const count = this.#limit - this.#current;
    if (count <= 0) return;

    const jobs = this.#tasks.splice(0, count);
    const tasks = jobs.map(async job => {
      try {
        this.#current++;
        await job.handler(job.params);
      } catch(err) {
        console.log(err);
      } finally {
        this.#current--;
        this.run();
      }
    });

    Promise.all(tasks)//.then(console.info).catch(console.error);
  }
}


const scheduler = new Scheduler(3);

for (const i of Array(10).keys()) {
  scheduler.add(i, async (params) => {
    await new Promise(resolve => setTimeout(resolve, i * 1000));
    console.log(params);
    scheduler.add('abc' + i, async params => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(params);
    });
  });
}


setTimeout(() => {
  console.log('done')
}, 10000);
