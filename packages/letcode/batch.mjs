async function* batch(tasks, limit, fn) {
  for (let i = 0; i <= tasks.length; i += limit) {
    const jobs = tasks.slice(i, i + limit);
    const results = await Promise.all(jobs.map(fn));
    yield results;
  }
}

for ()
