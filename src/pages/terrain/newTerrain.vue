<template>
  <q-page padding>
    <q-card bordered>
      <q-card-section>
        <h5 class="text-center text-left text-weight-bold">
          Nouveau Terrain
        </h5>
        <q-form @submit="newTerrain" class="q-gutter-md" ref="formTerrain">
          <div class="row justify-center">
            <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled clearable v-model="Name" lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Requis']" label="Nom" />
          </div>
          <div class="row justify-center">
            <q-input class="col-xs-12 col-sm-6 col-md-6 q-px-sm" rounded filled clearable v-model="adress" lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Requis']" label="Adresse" />

            <q-input clearable class="col-xs-12 col-sm-6 col-md-6 q-px-sm" v-model="capacity" label="Capacité"
              lazy-rules :rules="[(val) => (val && val.length > 0) || 'Requis']" rounded filled autogrow />
          </div>

          <div class="row justify-center">
            <q-btn label="Ajouter" type="submit" color="primary" />
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
  name: 'NewTerrain',

  setup() {

    const formTerrain = ref(null);
    const Name = ref(null);
    const adress = ref(null);
    const capacity = ref(null);


    // add event function
    const newTerrain = async () => {
      const { data } = await axios.post('terrains/add', {
        nom: Name.value,
        adresse: adress.value,
        capacity: capacity.value,
      });

      if (data) {
        console.log('SUCCESS');
        resetForm();
      } else console.log('ERROR');
    };

    //RESET FORM
    function resetForm() {
      Name.value =
        adress.value =
        capacity.value =
        null;
      formTerrain.value.resetValidation();
    }

    return {
      formTerrain,
      Name,
      adress,
      capacity,
      newTerrain,
      resetForm,
    }
  }
})
</script>

