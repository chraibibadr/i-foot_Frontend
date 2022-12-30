<template>
  <q-page>
    <q-table ref="eventTableRef" title="Vos annonces" no-data-label="Aucun enregistrements trouvés"
      no-results-label="Aucun enregistrements correspondants trouvés" loading-label="Chargement"
      rows-per-page-label="Element par page" :dense="$q.screen.lt.md" :rows="rows" bordered
      table-header-class="text-primary" :columns="columns" row-key="_id" v-model:pagination="pagination"
      :loading="loading" :filter="filter" binary-state-sort :visible-columns="visibleColumns" @request="onRequest">
      <template v-slot:top-right="props">
        <q-input dense debounce="1000" v-model="filter" placeholder="Filtrer">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen" class="q-ml-md" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="green" @click="showEditDialog(props.row)" icon="edit"></q-btn>
          <q-btn dense round flat color="red" @click="showDeleteDialog(props.row)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>

const columns = [
  {
    name: '_id',
    required: false,
    field: '_id',
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

export default ({
  name: 'EventsPage',

  setup() {

    return {
      columns,
    }
  }
})
</script>
