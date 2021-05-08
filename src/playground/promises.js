//Prmises are just a way to sync up our asynchrnous operations

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is my resolved data');
        // resolve('This is my other resolved data'); //promise can be either resolved or rejected neither it can be reslved or rejected again
        resolve({
            name: 'Andrew',
            age: 26
        });
        // reject('Something went wrong!')
    }, 5000)
});

console.log('before')

promise.then((data) => {
    console.log('1', data);

    // return 'some data';
    return new Promise((resolve, reject) => {  //by writing return we can pass this to the next then call
        setTimeout(() => {
            resolve('This is my other promise');
        }, 5000)
    });
}).then((str) => {
    console.log('does this run?', str);
}).catch((error) => {
    console.log('error: ', error);
})



console.log('after');