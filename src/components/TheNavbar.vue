<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="clickButtonMenu"
        aria-label="Menu"
        icon="menu"
      />

      <q-toolbar-title>
        Swapi App
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TheNavbar',

  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: Boolean,
    },
  },

  setup(props, context) {
    function clickButtonMenu() {
      context.emit('update:modelValue', !ref(props.modelValue).value);
    }

    return {
      clickButtonMenu,
    };
  },
};
</script>
