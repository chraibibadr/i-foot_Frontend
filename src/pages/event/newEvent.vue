<template>
  <q-page padding>
    <q-card bordered>
      <q-card-section>
        <h5 class="text-center text-left text-weight-bold">
          Nouvelle annnoce
        </h5>
        <q-form @submit="newEvent" class="q-gutter-md" ref="formEvent">
          <div class="row justify-center">
            <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled clearable v-model="title" lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Requis']" label="Titre" />
            <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled transition-show="jump-up"
              transition-hide="scale" @filter="filterPitch" v-model="selectPitch" :options="optionsPitch" lazy-rules
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
import { axios } from 'boot/axios';

export default ({
  name: 'NewEvent',

  setup() {

    const formEvent = ref(null);
    const title = ref(null);

    const selectPitch = ref(null);
    const optionsPitch = ref(null);
    const pitches = [];

    const date = ref(null);
    const selectVille = ref(null);
    const selectZone = ref(null);
    const description = ref(null);

    // add event function
    const newEvent = async () => {
      const { data } = await axios.post('annonces/add', {
        titre: title.value,
        description: description.value,
        ville: selectVille.value,
        zone: selectZone.value,
        date: date.value.replaceAll("/", "-"),
        terrain: {
          id: selectPitch.value.value,
          nom: selectPitch.value.label,
          adresse: selectPitch.value.adresse,
          capacity: selectPitch.value.capacity,
          photos: selectPitch.value.photos,
        }
      });

      if (data) {
        console.log("SUCCESS");
        resetForm();
      } else console.log("ERROR");
    };

    //RESET FORM
    function resetForm() {
      title.value =
        description.value =
        selectVille.value =
        selectZone.value =
        selectPitch.value =
        date.value =
        null;
      formEvent.value.resetValidation();
    }

    return {
      formEvent,
      title,
      filterPitch(val, update, abort) {
        if (optionsPitch.value !== null) {
          update();
          return;
        }

        setTimeout(() => {
          update(async () => {
            const { data } = await axios.get('terrains/all');
            pitches.splice(0, pitches.length);
            data.forEach((element) => {
              pitches.push({ label: element.nom, value: element.id, capacity: element.capacity, adresse: element.adresse, photos: element.photos });
            });
            console.log(pitches);
            optionsPitch.value = pitches;
          });
        }, 500);
      },
      optionsPitch,
      date,
      newEvent,
      selectVille,
      optionsVille: ['Marrakech', 'Rabat', 'Casablanca'],
      selectZone,
      optionsZone: ['SYBA', 'Daoudiat', 'Gueliz'],
      description,
      selectPitch,
      resetForm,
    }
  }
})
</script>
