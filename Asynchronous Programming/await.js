async function start() {
    console.log('begin');

    const p = new Promise((resolve) => {
        console.log('executor begins')

        setTimeout(resolve, 2000);

        console.log('executor ends')
    });
    await p;
     
    console.log('timer ends');

    console.log('end');
}

console.log('before start');
const result = start();
console.log('after start');