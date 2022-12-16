<template>
  <q-page>
    <q-table ref="eventTableRef" title="Vos annonces" no-data-label="Aucun enregistrements trouvés"
      no-results-label="Aucun enregistrements correspondants trouvés" loading-label="Chargement"
      rows-per-page-label="Element par page" :dense="$q.screen.lt.md" :rows="rows" bordered
      table-header-class="text-blue" :columns="columns" row-key="_id" v-model:pagination="pagination" :loading="loading"
      :filter="filter" binary-state-sort :visible-columns="visibleColumns" @request="onRequest">
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
    name: 'name',
    required: true,
    field: 'name',
    label: 'Nom',
    align: 'left',
  },
  {
    name: 'adress',
    required: true,
    field: 'adress',
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
];

export default ({
  name: 'TerrainsPage',

  setup() {

    return {
      columns,
    }
  }
})
</script>
