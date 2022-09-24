class MyPromise {
  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  constructor(func) {
    this.value = null;
    this.reason = null;
    this.callbacks = [];
    this.status = 'pending';
    func(this.#resolve.bind(this), this.#reject.bind(this));
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handle({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  #handle(callback) {
    switch(this.status) {
      case 'pending':
        this.callbacks.push(callback);
        break;

      case 'fulfilled':
        process.nextTick(() => {
          let cb;
          let result;
          try {
            result = callback.onFulfilled ? callback.onFulfilled(this.value) : undefined;
            cb = callback.resolve;
          } catch (e) {
            cb = callback.reject;
            result = e;
          } finally {
            cb(result);
          }
        });
        break;

      case 'rejected':
        process.nextTick(() => {
          let cb;
          let result;
          try {
            result = callback.onRejected ? callback.onRejected(this.reason) : undefined;
            cb = callback.reject;
          } catch (e) {
            result = e;
          } finally {
            cb(result);
          }
        });
    }
  }

  #resolve(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      return value.then(value => this.#resolve(value))
        .catch(reason => this.#reject(reason));
    }

    this.status = 'fulfilled';
    this.value = value;
    this.callbacks.forEach(cb => this.#handle(cb));
  }

  #reject(reason) {
    this.status = 'rejected';
    this.reason = reason;
    this.callbacks.forEach(cb => this.#handle(cb));
  }
}


new MyPromise((resolve) => {
  console.info('promise 1');
  setTimeout(() => resolve('123'), 1000);
})
  .then(value => {
    console.info('then 2', value);
    return MyPromise.resolve('666');
  })
  .then(value => {
    console.info('then 3', value);
  })
  .then(value => {
    throw new Error('13');
  })
  .catch((e) => {
    console.info(e);
  });
