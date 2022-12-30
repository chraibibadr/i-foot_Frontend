<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ route.meta.title || 'Foot Fans Only' }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header> Menu </q-item-label>
          <template v-for="(menuItem, index) in pithcLinks" :key="index">
            <q-item :to="menuItem.link" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
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

const pithcLinks = [
  {
    label: 'Accueil',
    icon: 'home',
    link: '/',
    separator: true,
  },
  {
    label: 'Les terrains',
    icon: 'terrain',
    link: '/pitch',
    separator: true,
  },
  {
    label: 'Nouveau terrain',
    icon: 'edit',
    link: '/pitch/new',
    separator: true,
  },
];

export default {
  name: 'PitchLayout',
  setup() {
    const route = useRoute();
    const leftDrawerOpen = ref(false);

    return {
      pithcLinks,
      leftDrawerOpen,
      toggleLeftDrawer() { leftDrawerOpen.value = !leftDrawerOpen.value; },
      link: ref(null),
      route,
    };
  },
};
</script>
