
import * as firebase from "firebase";
import 'firebase/firestore';
import ENV from '../env'

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }


 const firebaseApp = !firebase.apps.length 
 ? firebase.initializeApp(ENV)
 : firebase.app()

 const db = firebaseApp.firestore();

 export default db;