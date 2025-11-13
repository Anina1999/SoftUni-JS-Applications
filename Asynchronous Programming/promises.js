console.log('before promise');

const promise = new Promise(executor);

console.log('after promise');

promise
    .then((data) => console.log('promise resolved', data))
    .catch((error) => console.log('promise rejected:', error))
    .finally(() => console.log('promise settled'));

function executor(resolve, reject) {
    console.log('inside promise');

    // resolve('hello');
    setTimeout(reject, 2000, 'hello');
}