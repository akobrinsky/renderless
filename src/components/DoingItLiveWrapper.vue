<template>
  <DoingItLive :objects="characters" sort-by="name">
    <template #default></template>
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
