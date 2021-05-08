// Object destructuring

// const person = {
//     //name: 'Andrew',
//     age: 27,
//     location: {
//         city: 'Philadelphia',
//         temp: 92 
//     }
// };

// //default value if there no person.name
// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location

// if(city && temperature) {
//     console.log(`It's ${temperature} in ${city}. `);
// }

// const book = {
//     title: 'Ego is the Enemny',
//     author: 'Ryan Holiday',
//     publisher: {
//        name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published' } = book.publisher;
 
// console.log(publisherName); 

// Array destructuring

// const address = ['1299 S Junipar Street', 'Philadelphia', 'Pennsylvania', '19147'];


// const [, city , state = 'New York'] = address; //this means skip the first two items 
                                          //if there is no 3rd item then it will be new york
// console.log(`You are in ${state}.`);


const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];

const[itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} consts ${mediumPrice} `)
