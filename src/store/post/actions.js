import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export function sendPost ({}, data) {
    let currentUser = firebaseAuth.currentUser;
    firebaseDb.collection("posts-feed").add({
        postUser: currentUser.uid,
        postCaption: data.caption,
        postDay: data.day,
        postMonth: data.month,
        postYear: data.year,
        postLike: '0',
        postPic: '',
        postLocation: data.location,
        postTime: new Date()
    })
    .then(response => {
        firebaseDb.collection("posts-feed")
        .where("postUser", "==", currentUser.uid)
        .where("postCaption", "==", data.caption)
        .get()
        .then(result => {
            result.forEach(doc => {

                var storageRef = firebase.storage().ref()
                var mountainImagesRef = storageRef.child(`posts/${doc.id}`)
                var message = data.picture

                mountainImagesRef.putString(message, 'data_url').then(snapshot => {
                    
                    console.log('Uploaded a data_url string! ' + doc.id)

                    firebaseDb.collection("posts-feed").doc(doc.id).update({
                        postPic: doc.id
                    })
                    .then(finish => {
                        this.$router.push({ path: '/FeedFollowing' })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    

                })
            })
        })
    })
    
}
