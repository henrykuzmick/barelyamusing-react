import * as firebase from 'firebase/firebase-browser';
import {firebaseConfig} from '../config';


class FirebaseApi {

  static initAuth() {
    firebase.initializeApp(firebaseConfig);
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub();
          resolve(user);
        },
        error => reject(error)
      );
    });
  }

  static createUserWithEmailAndPassword(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  static signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  static authSignOut(){
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .push(value, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static getLatestValueByUrl(path, limit) {
    return firebase
      .database()
      .ref(path)
      .limitToLast(limit)
      .once('value');
  }

  static uploadFile(file, filename) {
    return firebase
      .storage()
      .ref()
      .child(`images/${filename}`)
      .put(file);
  }

  static getList(path) {
    return firebase
      .database()
      .ref(path)
  }

  static getChildAddedByUrl(path, url) {
    return firebase
      .database()
      .ref(path)
      .orderByChild("link")
      .equalTo(url)
      .once('child_added');
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once('child_added');
  }

  static databaseSet(path, value) {

    return firebase
      .database()
      .ref(path)
      .set(value);

  }

  static databaseUpdate(data) {
    return firebase
      .database()
      .ref()
      .update(data);
  }

  static databaseGenerateKey(path) {
    return firebase
      .database()
      .ref()
      .child(path).push().key;
  }
}

export default FirebaseApi;
