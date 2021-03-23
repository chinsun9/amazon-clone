import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: '000000000000000000000000000000000000000',
  authDomain: 'clone-00000.firebaseapp.com',
  databaseURL: 'https://clone-00000.firebaseio.com',
  projectId: 'clone-00000',
  storageBucket: 'clone-00000.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:0000000000000000000000',
  measurementId: '000000000000',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

let unsubscribe = null;

const getOrders = (user, f) => {
  const documentData = db
    .collection('users')
    .doc(user?.uid)
    .collection('orders')
    .orderBy('created', 'desc');

  unsubscribe = documentData.onSnapshot((snapshot) => {
    console.log(snapshot);
    f(
      snapshot.docs.map((doc) => {
        const { id } = doc;
        return { id, data: doc.data() };
      })
    );
  });
};

const signOut = () => {
  if (unsubscribe) unsubscribe();
  auth.signOut();
};

export { db, auth, signOut, getOrders };
