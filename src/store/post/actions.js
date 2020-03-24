import { firebaseAuth, firebaseDb } from 'boot/firebase'
import * as firebase from "firebase/app"
import 'firebase/storage'

export function sendPost ({}, data) {
    let currentUser = firebaseAuth.currentUser;
    firebaseDb.collection("posts-feed").add({
        postUser: currentUser.uid,
        postCaption: data.caption,
        postDate: data.date,
        postLike: '0',
        postComment: '0',
        // !For dev
        // postPic: data.picture,
        postLocation: data.location,
        postTime: new Date()
    })

    // !For real world BEGIN
    .then(get => {
        
        cordova.plugins.photoLibrary.getPhoto(
            res, // or libraryItem.id
            (fullPhotoBlob) => {

                var reader = new FileReader()

                reader.onloadend = e => {
                    this.sendInfo.picture = e.currentTarget.result
                }

                reader.readAsDataURL(fullPhotoBlob)
            },
            function (err) {
                console.log('Error occured')
            }
        )
    })
    // !For real world END
    
    .then(response => {
        this.$router.push({ path: '/FeedFollowing' })
        .catch(err => {
            console.log(err)
        })
    })
}

export function genPostList({commit}){
    firebaseDb.collection('posts-feed').orderBy('postTime', 'asc').get()
        .then(docs => {
            docs.forEach(doc => {
                // console.log(change.doc.data())
                firebaseDb.collection("users-info").doc(doc.data().postUser).get()
                .then(response => {

                    const newArr = {}

                    newArr.postUser = response.data().name
                    newArr.postUserUrl = '/UserProfile/' + doc.data().postUser
                    newArr.postUrl = '/SinglePost/' + doc.id
                    newArr.postCap = doc.data().postCaption
                    newArr.postDate = doc.data().postDate
                    newArr.postLike = doc.data().postLike
                    // !For Dev
                    // newArr.postPic = change.doc.data().postPic
                    newArr.postLocation = doc.data().postLocation
                    newArr.postComment = doc.data().postComment
                    // !For Dev
                    // newArr.userAvatar = response.data().avatar
                    newArr.postId = doc.id

                    // !FOR REAL WORLD BEGIN
                    var storageRef = firebase.storage().ref()
                    var avatarImagesRef = storageRef.child(`avatars/${doc.data().postUser}`)      

                    avatarImagesRef.getDownloadURL().then(url => {

                        newArr.userAvatar = url

                    })
                    .then(resp => {
                        var postsImagesRef = storageRef.child(`posts/${doc.id}`)      

                        postsImagesRef.getDownloadURL().then(url => {

                        newArr.postPic = url

                        })
                        .then(resp => {
                            commit('setPosts', newArr)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    // !FOR REAL WORLD END

                    // ! FOR DEV
                    // this.getPostList.unshift(newArr)

                    // console.log(this.getPostList)

            })
        })
    })
}
