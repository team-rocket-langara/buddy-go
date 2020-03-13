import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"

export function startFollow ({}, data) {
    let currentUser = firebaseAuth.currentUser;
    firebaseDb.collection("users-follow").doc(currentUser.uid).set({
        userFollow: data
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })
}
