import { firebaseAuth, firebaseDb } from 'boot/firebase'
import VueRouter from 'vue-router'

export function registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
        this.$router.push({ path: '/InformDetails'})
    })
    .catch(function(error) {
        console.error(error)
    })
}

export function firstUpdate(userName){
    firebaseAuth.currentUser.updateProfile({
        displayName: userName
    })
    .then(response => {
        this.$router.push({ path: '/FeedFollowing'})
    })
    .catch(function(error){
        console.log(error)
    })
}