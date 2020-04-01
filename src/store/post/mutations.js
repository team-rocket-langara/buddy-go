export function setPosts (state, getPosts) {
    state.postsInfo.unshift(getPosts)
}