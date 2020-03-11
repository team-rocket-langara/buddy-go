export function registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
        console.log(response)
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.collection("users").doc(userId).set({
            email: payload.email,
            password: payload.password
        })
    })
    .catch(function(error) {
        console.error(error)
    })
}
