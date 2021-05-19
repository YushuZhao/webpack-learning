export default class newPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(executor) {
        this.status = newPromise.PENDING;
        this.value = null;
        this.callbacks = [];

        // 执行者异步捕获
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        // 状态保护,状态一经改变便不能被再次改变
        if (this.status == newPromise.PENDING) {
            this.status = newPromise.FULFILLED;
            this.value = value;
            // PENDING异步任务处理技巧
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value);
                });
            });
        }
    }

    reject(reason) {
        if (this.status == newPromise.PENDING) {
            this.status = newPromise.REJECTED;
            this.value = reason;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason);
                });
            });
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled != "function") {
            // then的穿透
            onFulfilled = () => this.value;
        }
        if (typeof onRejected != "function") {
            onRejected = () => this.value; // ？有问题
        }

        // then链式
        let promise = new newPromise((resolve, reject) => {
            // PENDING状态异常处理
            if (this.status == newPromise.PENDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(value), resolve, reject);
                        /*
                            try {
                                let result = onFulfilled(value);
                                resolve(result);
                            } catch (error) {
                                reject(error);
                            }
                        */
                    },
                    onRejected: reason => {
                        this.parse(promise, onRejected(reason), resolve, reject);
                        /*
                            try {
                                let result = onRejected(reason);
                                resolve(result);
                            } catch (error) {
                                reject(error);
                            }
                        */
                    }
                })
            }
            if (this.status == newPromise.FULFILLED) {
                setTimeout(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject);
                    /*
                        try {
                            let result = onFulfilled(this.value);
                            // then返回promise的处理
                            if (result instanceof newPromise) {
                                result.then(resolve, reject);
                                // <==>
                                // result.then(value => {
                                //     resolve(value);
                                // }, reason => {
                                //     reject(reason)
                                // })
                            } else {
                                resolve(result);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    */
                })
            }
            if (this.status == newPromise.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject);
                })
            }
        });
        return promise;
    }

    parse(promise, result, resolve, reject) {
        if (promise == result) {
            throw new Error('Chaining cycle detected');
            // 杜绝下面情况发生
            /* 
                let promise = new newPromise((resolve, reject) => {
                    resolve('解决');
                });
                let p = promise.then(value => {
                    return p
                });
            */
        }
        try {
            if (result instanceof newPromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }

        } catch (error) {
            reject(error);
        }
    }

    static resolve(result) {
        return new newPromise((resolve, reject) => {
            if (result instanceof newPromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        })
    }

    static reject(result) {
        return new newPromise((resolve, reject) => {
            reject(result);
        })
    }

    static all(promises) {
        const values = [];
        return new newPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    value => {
                        values.push(value);
                        if (values.length == promises.length) {
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        })
    }

    static race(promises) {
        return new newPromise((resolve, reject) => {
            promises.map(promise => {
                promise.then(value => {
                    resolve(value);
                }, reason => {
                    reject(reason);
                })
            })
        })
    }
}