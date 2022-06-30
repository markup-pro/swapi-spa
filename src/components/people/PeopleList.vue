<template>
  <div class="q-pa-md" v-if="people.length > 0">
    <q-table
      title="People Star Wars"
      :rows="people"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
    />
  </div>
  <div class="q-pa-md" v-else>
    <people-list-placeholder />
  </div>
</template>

<script>
import { useStore } from '@/store';
import { ref, computed } from 'vue';
import PeopleListPlaceholder from '@/components/people/PeopleListPlaceholder.vue';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'gender',
    required: true,
    label: 'Gender',
    align: 'center',
    field: 'gender',
  },
  {
    name: 'hair_color',
    required: true,
    label: 'Hair color',
    align: 'center',
    field: 'hair_color',
  },
  {
    name: 'eye_color',
    required: true,
    label: 'Eye color',
    align: 'center',
    field: 'eye_color',
  },
  {
    name: 'birth_year',
    required: true,
    label: 'Birth year',
    align: 'center',
    field: 'birth_year',
  },
];

export default {
  name: 'PeopleList',

  components: {
    PeopleListPlaceholder,
  },

  setup() {
    const store = useStore();
    const people = computed(() => store.peopleFilter);

    return {
      people,
      columns,
      pagination: ref({
        rowsPerPage: 10,
      }),
    };
  },
};
</script>
