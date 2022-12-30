<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title> Foot Fans Only </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="window-height">
      <div class="q-pa-md full-height">
        <q-card bordered>
          <q-card-section>
            <div class="row q-col-gutter-x-sm q-col-gutter-y-sm justify-center">
              <div class="col-xs-12 col-md-6">
                <q-btn class="fit" color="primary" stack to="event">
                  <q-icon size="8em" name="person" />
                  <div>Joueur</div>
                </q-btn>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-btn class="fit" color="primary" stack to="pitch">
                  <q-icon size="8em" name="stadium" />
                  <div>Proprietaire</div>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AppsMenu',

  setup() {

    return {
      link: ref(null),
    };
  },
};
</script>
