
const routes = [
  {
    path: '/FeedFollowing',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeedFollowing.vue') }
    ]
  },
  {
    path: '/Maps',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Maps.vue') }
    ]
  },
  {
    path: '/ProfilePage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ProfilePage.vue') }
    ]
  },
  {
    path: '/PostSingle',
    component: () => import('layouts/CommentLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PostSingle.vue') }
    ]
  },
  {
    path: '/BuddyAdopt',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BuddyAdopt.vue') }
    ]
  },
  {
    path: '/Camera',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Camera.vue') }
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
    path: '/MyProfile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyProfile.vue') }
    ]
  },
  {
    path: '/ChatRoom',
    component: () => import('layouts/ChatLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChatRoom.vue') }
    ]
  },
  {
    path: '/',
    name: 'CreateAccount',
    component: () => import('pages/CreateAccount.vue')
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: () => import('pages/AboutMe.vue')
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
