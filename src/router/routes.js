
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
    component: () => import('layouts/MainLayout.vue'),
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
    path: '/',
    name: 'CreateAccount',
    component: () => import('pages/CreateAccount.vue')
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
