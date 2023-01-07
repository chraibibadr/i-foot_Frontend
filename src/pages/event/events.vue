<template>
  <q-page>
    <q-table :grid="$q.screen.xs" title="Vos annonces" no-data-label="Aucune annonce trouvé"
      no-results-label="Aucune annonce correspondante trouvé" loading-label="Chargement"
      rows-per-page-label="Element par page" :dense="$q.screen.lt.md" :rows="rows" bordered
      table-header-class="text-primary" :visible-columns="visibleColumns" :columns="columns" row-key="id"
      :filter="filter" binary-state-sort>
      <template v-slot:top-right="props">
        <q-input dense v-model="filter" placeholder="Filtrer">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>
      <template v-slot:body-cell-terrain="props">
        <q-td :props="props">
          {{ props.row.terrain.nom }}
        </q-td>
      </template>
      <template v-slot:body-cell-date="props">
        <q-td :props="props">
          {{ props.row.date.substring(0, 10) }}
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="red" @click="showDeleteDialog(props.row)" icon="delete"></q-btn>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center">
              <strong>{{ props.row.titre }}</strong>
              <q-btn dense round flat color="red" @click="showDeleteDialog(props.row)" icon="delete"></q-btn>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="q-table__grid-item-title">Terrain</div>
              {{ props.row.terrain.nom }}
              <div class="q-table__grid-item-title">Description</div>
              {{ props.row.description }}
              <div class="q-table__grid-item-title">Date</div>
              {{ props.row.date.substring(0, 10) }}
              <div class="q-table__grid-item-title">Ville</div>
              {{ props.row.ville }}
              <div class="q-table__grid-item-title">Zone</div>
              {{ props.row.zone }}
            </q-card-section>
          </q-card>
        </div>
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
        <q-btn @click="deleteEvent" flat label="Confirmer" color="red" v-close-popup />
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
    name: 'titre',
    required: true,
    field: 'titre',
    label: 'Titre',
    align: 'left',
  },
  {
    name: 'terrain',
    required: true,
    field: 'terrain',
    label: 'Terrain',
    align: 'left',
  },
  {
    name: 'date',
    required: true,
    field: 'date',
    label: 'Date',
    align: 'center',
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    field: 'description',
    label: 'Description',
    align: 'left',
  },
  {
    name: 'ville',
    required: true,
    field: 'ville',
    label: 'Ville',
    align: 'left',
    sortable: true,
  },
  {
    name: 'zone',
    required: true,
    field: 'zone',
    label: 'Zone',
    align: 'left',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center',
  },
];

async function loadEvents() {
  const { data } = await axios.get('annonces/all');
  console.log(data);
  return data;
}

export default ({
  name: 'EventsPage',

  setup() {
    const rows = ref([]);

    onMounted(async () => {
      rows.value = await loadEvents();
    });

    // delete event function
    const deleteEvent = async () => {
      await axios.delete('annonces/delete/' + selectedEvent.value);
      rows.value = await loadEvents();
    };

    const deleteDialog = ref(false);
    const selectedEvent = ref(null);


    // show delete dialog function
    function showDeleteDialog(item) {
      selectedEvent.value = item.id;
      deleteDialog.value = true;
    }

    return {
      columns,
      rows,
      deleteDialog,
      showDeleteDialog,
      deleteEvent,
      selectedEvent,
      filter: ref(''),
      visibleColumns: ref([
        'titre',
        'terrain',
        'date',
        'description',
        'ville',
        'zone',
        'actions',
      ]),
    }
  }
})
</script>
