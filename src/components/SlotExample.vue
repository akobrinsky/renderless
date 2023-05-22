<template>
  <header>
    <slot :title="title">
      <h1>This is a title</h1>
    </slot>
  </header>
</template>

<script setup>
import { ref } from "vue";

const title = ref("Scoped Slot");
</script>
