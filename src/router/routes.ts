import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('pages/menu.vue'),
  },
  {
    path: '/event',
    component: () => import('layouts/EventLayout.vue'),
    children: [
      {
        meta: {
          title: 'Nouvelle annonce',
        },
        path: '/event/new',
        component: () => import('pages/event/newEvent.vue'),
      },
      {
        meta: {
          title: 'Vos annonces',
        },
        path: '/event',
        component: () => import('pages/event/events.vue'),
      },
      {
        meta: {
          title: 'Les demandes',
        },
        path: '/event/demands',
        component: () => import('pages/event/eventDemands.vue'),
      },
    ],
  },

  {
    path: '',
    component: () => import('layouts/PitchLayout.vue'),
    children: [
      {
        meta: {
          title: 'Nouveau terrain',
        },
        path: '/pitch/new',
        component: () => import('pages/terrain/newTerrain.vue'),
      },
      {
        meta: {
          title: 'Les terrains',
        },
        path: '/pitch',
        component: () => import('pages/terrain/terrains.vue'),
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
