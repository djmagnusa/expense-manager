import * as firebase from 'firebase'; //takes all of the named exprts from firebase and dumps it onto a varaible called firebase

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_API_KEY,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export { firebase, database as default }

  //child_removed
  // database.ref('expenses').on('child_removed', (snapshot) => {  //this is a subscriber which will notify everytime a child is removed
  //   console.log(snapshot.key, snapshot.val()); //for printing id and the data of the deleted item
  // });

  // //child_changed
  // database.ref('expenses').on('child_changed', (snapshot) => {  //fires when a child or data of the children is changed
  //   console.log(snapshot.key, snapshot.val());
  // });

  // //child_added
  // database.ref('expenses').on('child_added', (snapshot) => { //fires every single time a child is added
  //   console.log(snapshot.key, snapshot.val()); //this will print two times for all of the current children and then is is also going to rerun for all the new expenses
  //                                              //so it also gets called for the existing one
  // });

  // database.ref('expenses')
  //   .once('value')
  //   .then((snapshot) => {
  //     //check snapshotData in firebase docs
  //     const expenses = [];

  //     snapshot.forEach((childSnapshot) => {
  //       expenses.push({
  //         id: childSnapshot.key,
  //         ...childSnapshot.val()
  //       });
  //     });

  //     console.log(expenses);
  //   });

  // database.ref('expenses').on('value', (snapshot) => { //since on does not support promised therefore we are writing a callback function as the second argument
  //   const expenses = [];

  //   snapshot.forEach((childSnapshot) => {
  //     expenses.push({
  //       id: childSnapshot.key,
  //       ...childSnapshot.val()
  //     });
  //   });

  //   console.log(expenses);
  // });
  // database.ref('expenses').push({
  //   description: 'Rent',
  //   note: '',
  //   amount: 109500,
  //   createdAt: 976123498763
  // });



  //database.ref('notes/-M_0oGRbiV5wU3W_fJfI').remove();

  // database.ref('notes').push({ //using push it will pushed to a unique id. So it automatically generates an id for us
  //   title: 'Course Topics', 
  //   body: 'React Native, Angular, Python'
  // });

  //in the firebase world, the keys on this object will gonna be the IDs
  // const firebaseNotes = {
  //   notes: {
  //     apijasdf: { //this is the id
  //       title: 'First note!',
  //       body: 'This is my note'
  //     },
  //     apoijasdfpoijwe: { //this is the id
  //       title: 'Another note',
  //       body: 'This is my note'
  //     }
  //   }
  // };

  // const notes = [{
  //   id: '12',
  //   title: 'First note!',
  //   body: 'This is my note'
  // }, {
  //   id: '761ase',
  //   title: 'Another note',
  //   body: 'This is my note'
  // }];

  // database.ref('notes').set(notes);
  // database.ref('notes/12')

  // database.ref().on('value', (snapshot) => {
  //     const val = snapshot.val();
  //     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  // })
//   const onValueChange = database.ref().on('value', (snapshot) => {  //second argument is the callback function which will run everytime which things went well and when data is updated in database
//     console.log(snapshot.val());
//   }, (e) => {
//      console.log('Error with data fetching', e);
//   });

//   setTimeout(() => {
//     database.ref('age').set(29);
//   }, 3500);

//   setTimeout(() => {
//    database.ref().off(onValueChange); //to cancel all the subscription on that reference. But in firebase data will change
//  }, 7000);

//  setTimeout(() => {
//    database.ref('age').set(30);
//  }, 10500);

//   database.ref('location/city')
//      .once('value') //once returns a promise
//      .then((snapshot) => {
//       const val = snapshot.val();  //to fetch all the data in database
//       console.log(val);
//      })
//      .catch((e) => {
//       console.log('Error fetching data', e);
//      });

  //ref gives us a reference to a specific part of our database
//   database.ref().set({   //gives access to all of the database related features. And ref is used to get the reference of the database
//      name: 'Pratush Bhandari',
//      age: 26,
//      stressLevel: 6,
//      job: {
//         title: 'Software developer',
//         company: 'Google'
//      },
//      isSingle: false,
//      location: {
//         city: 'Philadelphia',
//         country: 'United States'
//      }
//   }).then(() => {
//      console.log('Data is saved');
//   }).catch((e) => {
//       console.log('This failed', e);
//   });

  //database.ref().set('This is my data.'); //this will overwrite previous values.
  //and set and also accept strings rather than just objects

// database.ref('age').set(27); //just getting the reference for age. SO only the age will be overwritten rather than the whole data or object
// database.ref('location/city').set('New York');

// database.ref('attributes').set({
//     height: 73,
//     weight: 150
// }).then(() => {
//    console.log('Second set call worked.');
// }).catch((e) => {
//    console.log('Things didnt work for the second error', e)
// });

//console.log('I made a request to change the data.');

//database.ref('isSingle').set(null) //wiping data using set. This is equivalent to calling remove

// database.ref().update({ 
//    // name: 'Mike',
//    // age: 29,
//    // job: 'Software developer', //job was not an existing data so it will be set
//    // isSingle: null //to delete
//    // job: 'Manager',
//    // 'location/city': 'Boston'
//    stressLevel: 9,
//    'job/company': 'Amazon',
//    'location/city': 'Seattle'
// });

// database.ref()
//   .remove()
//   .then(() => {
//    console.log('Data was removed');
//   }).catch((e) => {
//    console.log('Did not remove data', e)
//   })
