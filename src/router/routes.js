
const routes = [
  {
    path: '/',
    component: () => import('pages/Landing.vue')
  },
  {
    path: '/CreateAccount',
    component: () => import('pages/CreateAccount.vue')
  },
  {
    path: '/Login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/FeedFollowing',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeedFollowing.vue') }
    ]
  },
  {
    path: '/UserProfile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserProfile.vue') }
    ]
  },
  {
    path: '/SinglePost',
    component: () => import('layouts/SinglePostLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SinglePost.vue') }
    ]
  },
  {
    path: '/AboutMe',
    component: () => import('pages/AboutMe.vue')
  },
  {
    path: '/FeedAdopt',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeedAdopt.vue') }
    ]
  },
  {
    path: '/ChatList',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChatList.vue') }
    ]
  },
  {
    path: '/AdoptProfile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdoptProfile.vue') }
    ]
  },
  {
    path: '/ChatRoom',
    component: () => import('layouts/ChatRoomLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChatRoom.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
