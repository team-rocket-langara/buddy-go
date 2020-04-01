const routes = [
  {
    path: '/',
    component: () => import('pages/Landing.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/CreateAccount',
    component: () => import('pages/CreateAccount.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/Login',
    component: () => import('pages/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/InformDetails',
    component: () => import('pages/InformDetails.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/UpdatePicture',
    component: () => import('pages/UpdatePicture.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/PictureUpdate',
    component: () => import('pages/PictureUpdate.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/FeedFollowing',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeedFollowing.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/Explore',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Explore.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/UserProfile/:idUser',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '',
      component: () => import('pages/UserProfile.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/EditProfile',
    component: () => import('pages/EditProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Camera',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Camera.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/SinglePost/:postId/:userComment',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SinglePost.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/AboutMe/:idUser',
    component: () => import('pages/AboutMe.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/FeedAdopt',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeedAdopt.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/ChatList',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChatList.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/AdoptProfile/:adoptId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdoptProfile.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/ChatRoom/:userId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChatRoom.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/PreparePost/:picId/:picStore/:picEmu/:picN/:picPic/:picName',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '',
      component: () => import('pages/PreparePost.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/PostAdopt',
    component: () => import('pages/PostAdopt.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/AdoptPicture/:adoptId',
    component: () => import('pages/AdoptPicture.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/MyAdopts',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '',
      component: () => import('pages/MyAdopts.vue')
    }],
    meta: { requiresAuth: true }
  },
  {
    path: '/EditAdopt/:adoptId',
    component: () => import('pages/EditAdopt.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/EditAccount',
    component: () => import('pages/EditAccount.vue'),
    meta: { requiresAuth: true }
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
