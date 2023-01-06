<template>
  <q-page>
    <q-table title="Vos terrains" no-data-label="Aucun terrain trouvé"
      no-results-label="Aucun terrain correspondant trouvés" loading-label="Chargement"
      rows-per-page-label="Element par page" :dense="$q.screen.lt.md" :rows="rows" bordered
      table-header-class="text-primary" :columns="columns" row-key="id" :filter="filter" binary-state-sort>
      <template v-slot:top-right="props">
        <q-input dense v-model="filter" placeholder="Filtrer">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="red" @click="showDeleteDialog(props.row)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>

  <!-- start of delete confirmation dialog -->
  <q-dialog v-model="deleteDialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Suppression</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="row items-center">
        <span class="q-mx-sm">
          Voulez-vous vraiment supprimer cette annnoce !
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="deleteTerrain" flat label="Confirmer" color="red" v-close-popup />
        <q-btn flat label="Annuler" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- end of delete confirmation dialog -->
</template>

<script>
import { axios } from 'boot/axios';
import { onMounted, ref } from 'vue';

const columns = [
  {
    name: 'id',
    required: false,
    field: 'id',
    label: 'ID',
    align: 'left',
    sortable: true,
  },
  {
    name: 'nom',
    required: true,
    field: 'nom',
    label: 'Nom',
    align: 'left',
  },
  {
    name: 'adresse',
    required: true,
    field: 'adresse',
    label: 'Adresse',
    align: 'left',
  },
  {
    name: 'capacity',
    required: true,
    field: 'capacity',
    label: 'Capacité',
    align: 'center',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center',
  },
];

async function loadTerrains() {
  const { data } = await axios.get('terrains/all');
  return data;
}

export default ({
  name: 'TerrainsPage',

  setup() {
    const rows = ref([]);

    onMounted(async () => {
      rows.value = await loadTerrains();
    });

    // delete event function
    const deleteTerrain = async () => {
      await axios.delete('terrains/delete/' + selectedTerrain.value);
      rows.value = await loadTerrains();
    };

    const deleteDialog = ref(false);
    const selectedTerrain = ref(null);


    // show delete dialog function
    function showDeleteDialog(item) {
      selectedTerrain.value = item.id;
      deleteDialog.value = true;
    }

    return {
      columns,
      rows,
      deleteDialog,
      showDeleteDialog,
      deleteTerrain,
      selectedTerrain,
      filter: ref(''),
    }
  }
})
</script>

