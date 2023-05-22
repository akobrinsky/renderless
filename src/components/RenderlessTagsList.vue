<template>
  <RenderlessTags
    v-slot="{
      tagsInputAttrs,
      tagsInputEvents,
      deleteTag,
      addTag,
      clearAllTags,
    }"
    v-model="tags"
    :allow-spaces="true"
  >
    <div class="tags-list">
      <div class="flex mb-4 items-center gap-2">
        <input
          v-bind="tagsInputAttrs"
          type="text"
          placeholder="Add tag"
          class="tags-list__input"
          v-on="tagsInputEvents"
        />
        <button
          class="px-2 py-1 bg-blue-400 text-white rounded"
          :class="{ disabled: !tagsInputAttrs.value.length }"
          @click="addTag"
        >
          Add Tag
        </button>
        <button
          class="px-2 py-1 bg-blue-400 text-white rounded"
          :class="{ disabled: !tags.length }"
          @click="clearAllTags"
        >
          Clear
        </button>
      </div>
      <ul v-if="tags.length" class="bg-white p-2 border rouned">
        <li
          v-for="(tag, idx) in tags"
          :key="`${idx}__${tag}`"
          class="mb-2 last:mb-0"
        >
          <span class="tags-input__tag">{{ tag }}</span>
          <span class="cursor-pointer" @click="deleteTag(tag)">Remove 🗡️</span>
        </li>
      </ul>
    </div>
  </RenderlessTags>
</template>

<script setup>
import { ref } from "vue";
import RenderlessTags from "./RenderlessTags.vue";

const tags = ref([]);
</script>

<style scoped lang="pcss">

.tags-list__input {
  @apply outline-none flex px-2 py-1 border border-gray-300 rounded-md focus-within:border-blue-400 hover:border-blue-400 transition-colors;
}

.tags-input__tag {
  @apply  text-sm bg-pink-500 rounded text-white px-2 py-1 items-center cursor-default mr-1 mb-1;
}
</style>
