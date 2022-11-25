<template>
  <q-page padding>
    <q-card bordered>
          <q-card-section>
            <h5 class="text-center text-weight-bold">
              Nouvel événement
            </h5>
            <q-form @submit="submitEvent" class="q-gutter-md" ref="formEvent">
              <div class="row justify-center">
                <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" filled clearable v-model="title" lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Requis']" label="Titre" />
                <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" filled transition-show="jump-up"
                  transition-hide="scale" v-model="selectType" :options="optionsType" lazy-rules
                  :rules="[(val) => !!val || 'Requis']" label="Terrain" />
              </div>
              <div class="row justify-center">
                <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" filled v-model="date" mask="date" :rules="['date']"
                  error-message="Requis" label="La date">
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
                <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" filled clearable v-model.number="nbrPlayers"
                  type="number" label="Nombre de joueurs" />
              </div>
              <div class="row justify-center">
                <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" filled transition-show="jump-up"
                  transition-hide="scale" v-model="selectCategorie" :options="optionsCategorie"
                  @filter="filterCategorie" lazy-rules :rules="[(val) => !!val || 'Requis']"
                  label="La ville" />
                  <q-select class="col-xs-12 col-sm-6 col-md-6 q-px-sm" filled transition-show="jump-up"
                  transition-hide="scale" v-model="selectCategorie" :options="optionsCategorie"
                  @filter="filterCategorie" lazy-rules :rules="[(val) => !!val || 'Requis']"
                  label="La zone" />
              </div>
              <div class="row justify-center">
                <q-input clearable class="col-xs-12 col-sm-12 col-md-12 q-px-sm" v-model="description" label="Description"
                  lazy-rules :rules="[(val) => (val && val.length > 0) || 'Requis']" filled autogrow />
              </div>
              <div class="row justify-start q-px-sm">
                <q-btn label="Publier" type="submit" color="primary" />
                <q-btn @click="resetForm" label="Annuler" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>  </q-page>
</template>

<script>
export default ({
  name: 'NewEvent',
})
</script>
