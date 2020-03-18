import { firebaseAuth, firebaseDb } from 'boot/firebase'

//! USERS ACTIONS

export function registerUser({}, data) {
    firebaseAuth.createUserWithEmailAndPassword(data.email, data.password)
    .then(response => {
        this.$router.push({
            path: '/InformDetails'
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Code: ${errorCode} -- ${errorMessage}`);
    })
}

export function firstUpdate({}, data){
    let currentUser = firebaseAuth.currentUser;
    currentUser.updateProfile({
        displayName: data.name
    })
    .then(
        // Add a new document in collection "users-info"
        firebaseDb.collection("users-info").doc(currentUser.uid).set({
            name: data.name,
            breed: data.breed,
            gender: data.gender,
            birthday: data.birthday,
            food: data.food,
            toy: data.toy,
            bio: data.bio,
            hometown: data.hometown,
            avatar: ''
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
    )
    .then(
        this.$router.push({
            path: '/UpdatePicture'
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`Code: ${errorCode} -- ${errorMessage}`);
        })
    )
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Code: ${errorCode} -- ${errorMessage}`);
    })
}

export function userInfo({ commit }){
    let currentUser = firebaseAuth.currentUser;

    if (currentUser) {

        firebaseDb.collection("users-info").doc(currentUser.uid).get()
        .then(function(doc) {
            if (doc.exists) {                

                const userInfos = {
                    name: currentUser.displayName,
                    breed: doc.data().breed,
                    gender: doc.data().gender,
                    birthday: doc.data().birthday,
                    food: doc.data().food,
                    toy: doc.data().toy,
                    bio: doc.data().bio,
                    hometown: doc.data().hometown,
                    avatar: currentUser.photoUrl
                }               

                commit('setUserInfo', userInfos)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    } else {
        console.log('No user detected')
    }
}

export function updateUser({}, data){
    let currentUser = firebaseAuth.currentUser;

    if (currentUser) {

        currentUser.updateProfile({
            displayName: data.name
        })
        .then(
            // Update document in collection "users-info"
            firebaseDb.collection("users-info").doc(currentUser.uid).update({
                name: data.name,
                breed: data.breed,
                gender: data.gender,
                birthday: data.birthday,
                food: data.food,
                toy: data.toy,
                bio: data.bio,
                hometown: data.hometown
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Code: ${errorCode} -- ${errorMessage}`);
            })
        )

    } else {
        console.log('No user detected')
    }
}

export function otherUser({commit}, data){
    firebaseDb.collection("users-info").doc(data).get()
    .then(function(doc) {
        if (doc.exists) {                

            const userInfos = {
                name: doc.data().name,
                breed: doc.data().breed,
                gender: doc.data().gender,
                birthday: doc.data().birthday,
                food: doc.data().food,
                toy: doc.data().toy,
                bio: doc.data().bio,
                hometown: doc.data().hometown,
                avatar: data
            }

            commit('setOtherUserInfo', userInfos)

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}