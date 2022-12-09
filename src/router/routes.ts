import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        meta: {
          title: 'Nouvelle annonce',
        },
        path: '/event/new',
        component: () => import('pages/event/newEvent.vue')
      },
      {
        meta: {
          title: 'Vos annonces',
        },
        path: '/event',
        component: () => import('pages/event/newEvent.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
