<template>
  <DoingItLive :items="characters" sort-by="name">
    <template #default="{ sortedItems, sortHandler, resetHandler }">
      <p v-for="item in sortedItems" :key="item.favNum">
        {{ item.name }}: Fav Color is {{ item.favNum }}
      </p>
      <button
        @click="sortHandler"
        class="px-2 py-1 bg-blue-600 text-white mr-2"
      >
        Sort
      </button>
      <button @click="resetHandler" class="px-2 py-1 bg-blue-600 text-white">
        Reset
      </button>
    </template>
  </DoingItLive>
</template>

<script setup>
import { ref } from "vue";
import DoingItLive from "./DoingItLive.vue";
const characters = ref([
  {
    name: "Garrus",
    favNum: 10000,
  },
  {
    name: "Sonic",
    favNum: 77,
  },
  {
    name: "Rosie",
    favNum: 34,
  },
  {
    name: "Finn",
    favNum: 7,
  },
  {
    name: "Aryeh",
    favNum: 9999,
  },
  {
    name: "Wayne",
    favNum: 3030,
  },
]);
</script>
