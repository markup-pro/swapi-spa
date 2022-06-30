<template>
  <div class="q-pa-md">
    <p><strong>Filter</strong></p>
    <q-list bordered padding>
      <div v-for="(value, name) in options" :key="name">
        <q-item-label header>{{ FILTER_TITLE[name] }}</q-item-label>

        <div v-for="item in value" :key="item.title">
          <q-checkbox
            v-model="optionsSelected[name + 'Selected']"
            :val="item"
            :label="item.title ? item.title : item.name" />
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store';

const FILTER_TITLE = {
  films: 'Films',
  planets: 'Planets',
  species: 'Species',
};

export default {
  name: 'PeopleFilter',

  setup() {
    const store = useStore();
    const { optionsSelected } = storeToRefs(store);
    const options = computed(() => store.optionFilter);

    return {
      options,
      optionsSelected,
      FILTER_TITLE,
    };
  },
};
</script>
