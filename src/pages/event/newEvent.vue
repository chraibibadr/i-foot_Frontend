<template>
  <q-page padding>
    <q-card bordered>
      <q-card-section>
        <h5 class="text-center text-left text-weight-bold">
          Nouvelle annnoce
        </h5>
        <q-form @submit="submitEvent" class="q-gutter-md" ref="formEvent">
          <div class="row justify-center">
            <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled clearable v-model="title" lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Requis']" label="Titre" />
            <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled transition-show="jump-up"
              transition-hide="scale" v-model="selectPitch" :options="optionsPitch" lazy-rules
              :rules="[(val) => !!val || 'Requis']" label="Terrain" />
          </div>
          <div class="row justify-center">
            <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled v-model="date" mask="date"
              :rules="['date']" error-message="Requis" label="La date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fermer" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input clearable class="col-xs-12 col-sm-6 col-md-6 q-px-sm" v-model="description" label="Description"
              lazy-rules :rules="[(val) => (val && val.length > 0) || 'Requis']" rounded filled autogrow />
          </div>
          <div class="row justify-center">
            <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled transition-show="jump-up"
              transition-hide="scale" v-model="selectVille" :options="optionsVille" lazy-rules
              :rules="[(val) => !!val || 'Requis']" label="La ville" />
            <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled transition-show="jump-up"
              transition-hide="scale" v-model="selectZone" :options="optionsZone" lazy-rules
              :rules="[(val) => !!val || 'Requis']" label="La zone" />
          </div>
          <div class="row justify-start q-px-sm">
            <q-btn label="Publier" type="submit" color="primary" />
            <q-btn @click="resetForm" label="Annuler" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';


const pitches = [
  {
    name: 'Vitoria',
    capacity: 22,
    adress: 'Marrakech SYBA 3'
  },
  {
    name: 'Taher Lkhlej',
    capacity: 12,
    adress: 'Marrakech Mhamid'
  },
  {
    name: 'Zaytoun',
    capacity: 14,
    adress: 'Marrakech Gueliz'
  },
  {
    name: 'Agdal',
    capacity: 10,
    adress: 'Marrakech Daoudiat'
  }
]

export default ({
  name: 'NewEvent',

  setup() {

    const formEvent = ref(null);
    const title = ref(null);
    const selectPitch = ref(null);
    const optionsPitch = ref(null);
    const date = ref(null);
    const selectVille = ref(null);
    const selectZone = ref(null);
    const description = ref(null);

    optionsPitch.value = pitches.map(({ name }) => name);

    return {
      formEvent,
      title,
      selectPitch,
      optionsPitch,
      date,
      selectVille,
      optionsVille: ['Marrakech', 'Rabat', 'Casablanca'],
      selectZone,
      optionsZone: ['SYBA', 'Daoudiat', 'Gueliz'],
      description
    }
  }
})
</script>
