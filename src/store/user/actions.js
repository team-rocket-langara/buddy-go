import { firebaseAuth, firebaseDb } from 'boot/firebase'


export function registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
        this.$router.push({
            path: '/InformDetails'
        })
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Code: ${errorCode} -- ${errorMessage}`);
    })
}

export function firstUpdate({}, payload){
    firebaseAuth.currentUser.updateProfile({
        displayName: payload.name
    })
    .then(response => {
        this.$router.push({
            path: '/FeedFollowing'
        })
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Code: ${errorCode} -- ${errorMessage}`);
    })
}