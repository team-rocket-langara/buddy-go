export function setUserInfo (state, userInfos) {
    Object.assign(state.myUser, userInfos)
}

export function setOtherUserInfo (state, userInfos) {
    Object.assign(state.otherUser, userInfos)
}