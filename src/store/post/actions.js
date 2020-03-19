import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"

export function sendPost ({}, data) {
    let currentUser = firebaseAuth.currentUser;
    firebaseDb.collection("posts-feed").add({
        postUser: currentUser.uid,
        postCaption: data.caption,
        postDay: data.day,
        postMonth: data.month,
        postYear: data.year,
        postLike: '0',
        postPic: data.picture,
        postLocation: data.location,
        postTime: new Date()
    })
    .then(response => {
        this.$router.push({ path: '/FeedFollowing' })
        .catch(err => {
            console.log(err)
        })
    })
    
}
