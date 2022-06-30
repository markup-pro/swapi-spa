<template>
  <q-layout view="hHh lpR fFf">

    <the-navbar v-model="leftDrawerOpen" />

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <people-filter />
    </q-drawer>

    <q-page-container>
      <people-list />
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from 'vue';
import TheNavbar from '@/components/TheNavbar.vue';
import PeopleList from '@/components/people/PeopleList.vue';
import PeopleFilter from '@/components/people/PeopleFilter.vue';
import { useStore } from '@/store';

export default {
  name: 'LayoutDefault',

  components: {
    TheNavbar,
    PeopleList,
    PeopleFilter,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();

    onMounted(async () => {
      await store.getData();
    });

    return {
      leftDrawerOpen,
    };
  },
};
</script>
