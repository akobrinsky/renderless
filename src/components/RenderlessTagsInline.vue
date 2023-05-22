<template>
  <RenderlessTags
    v-slot="{ tagsInputAttrs, tagsInputEvents, deleteTag }"
    v-model="tags"
  >
    <div class="tags-inline">
      <span
        v-for="(tag, idx) in tags"
        :key="`${idx}__${tag}`"
        class="tags-inline__tag"
        >{{ tag
        }}<span class="px-1 cursor-pointer" @click="deleteTag(tag)"
          >X</span
        ></span
      >

      <input
        v-bind="tagsInputAttrs"
        type="text"
        placeholder="Add tag"
        class="tags-inline__input"
        v-on="tagsInputEvents"
      />
    </div>
  </RenderlessTags>
</template>

<script setup>
import { ref } from "vue";
import RenderlessTags from "./RenderlessTags.vue";

const tags = ref([]);
</script>

<style scoped lang="pcss">
.tags-inline {
  @apply px-2 pt-2 pb-1 rounded-lg flex flex-wrap border border-gray-300 bg-white focus-within:border-blue-300 hover:border-blue-300 transition-colors;
}
.tags-inline__input {
  @apply outline-none flex py-1 min-w-[10rem] border-none flex-1 mb-1 ml-1 text-sm leading-3;
}
.tags-inline__tag {
  @apply inline-flex text-sm bg-green-600 rounded text-white p-1 items-center mr-1 mb-1 leading-4;
}
</style>
