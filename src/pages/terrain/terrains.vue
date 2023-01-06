<template>
  <q-page>
    <q-table ref="eventTableRef" title="Vos terrains" no-data-label="Aucun enregistrements trouvés"
      no-results-label="Aucun enregistrements correspondants trouvés" loading-label="Chargement"
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
          <q-btn dense round flat color="green" @click="showEditDialog(props.row)" icon="edit"></q-btn>
          <q-btn dense round flat color="red" @click="showDeleteDialog(props.row)" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
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

    return {
      columns,
      rows,
      filter: ref(''),
    }
  }
})
</script>

