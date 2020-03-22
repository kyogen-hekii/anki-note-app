import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from './config'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseDb = firebaseApp.firestore()
