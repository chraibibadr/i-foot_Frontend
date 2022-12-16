<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ route.meta.title || 'Foot Fans Only' }}
        </q-toolbar-title>
        <!-- <q-btn flat round icon="person">
          <q-menu transition-show="jump-down" transition-hide="scale">
            <div class="row no-wrap q-pa-md justify-center items-center">
              <q-list class="rounded-borders text-primary">
                <q-item clickable v-ripple :active="link === 'profile'" @click="link = 'profile'" to="/profile"
                  active-class="text-white bg-blue-9">
                  <q-item-section avatar>
                    <q-icon name="manage_accounts" />
                  </q-item-section>

                  <q-item-section>Profile</q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item clickable v-ripple :active="link === ''" @click="link = '/'" to="/" exact
                  active-class="text-white bg-blue-9">
                  <q-item-section avatar>
                    <q-icon name="home" />
                  </q-item-section>

                  <q-item-section>Accueil</q-item-section>
                </q-item>
              </q-list>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="src/assets/avatar.png" />
                </q-avatar>

                <div class="q-mt-xs q-mb-md text-center text-weight-medium">
                  @{{ username }}
                </div>

                <q-btn color="primary" label="Déconnecter" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-menu>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header> Menu </q-item-label>
          <template v-for="(menuItem, index) in linksList" :key="index">
            <q-item :to="menuItem.link" exact clickable v-ripple v-if="
              route.path.includes(menuItem.context) || menuItem.context == '/'
            ">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator && route.path.includes(menuItem.context)" />
          </template>
        </q-list>
        <q-list>
          <template v-for="(menuItem, index) in terrainList" :key="index">
            <q-item :to="menuItem.link" exact clickable v-ripple v-if="
              route.path.includes(menuItem.context) || menuItem.context == '/'
            ">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator && route.path.includes(menuItem.context)" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const linksList = [
  {
    context: 'event',
    label: 'Vos annonces',
    icon: 'event',
    link: '/event',
    separator: true,
  },
  {
    context: 'event',
    label: 'Nouvelle annonce',
    icon: 'edit',
    link: '/event/new',
    separator: true,
  },
  {
    context: 'event',
    label: 'Les demandes',
    icon: 'topic',
    link: '/event/demands',
    separator: true,
  },
];

const terrainList = [
  {
    context: 'terrain',
    label: 'Les terrains',
    icon: 'terrain',
    link: '/terrain',
    separator: true,
  },
  {
    context: 'terrain',
    label: 'Nouveau terrain',
    icon: 'edit',
    link: '/terrain/new',
    separator: true,
  },
];

export default {
  name: 'MainLayout',
  setup() {
    const route = useRoute();
    const leftDrawerOpen = ref(false);

    return {
      linksList,
      terrainList,
      leftDrawerOpen,
      toggleLeftDrawer() { leftDrawerOpen.value = !leftDrawerOpen.value; },
      link: ref(null),
      route,
    };
  },
};
</script>
