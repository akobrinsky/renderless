<template>
  <div class="tags-list">
    <div class="flex mb-4 items-center gap-2">
      <input
        type="text"
        placeholder="Add tag"
        v-model="newTag"
        class="tags-list__input"
        ref="tagsInputRef"
        @keyup.enter="addTag"
        @keyup.space="addTag"
        @keyup.delete="handleDeleteKey"
      />
      <button
        class="px-2 py-1 bg-blue-400 text-white rounded"
        :class="{ disabled: !newTag.length }"
        @click="addTag"
      >
        Add Tag
      </button>
      <button
        class="px-2 py-1 bg-blue-400 text-white rounded"
        :class="{ disabled: !modelValue.length }"
        @click="clearAllTags"
      >
        Clear
      </button>
    </div>
    <ul v-if="modelValue.length" class="bg-white p-2 border rouned">
      <li
        v-for="(tag, idx) in modelValue"
        :key="`${idx}__${tag}`"
        class="mb-2 last:mb-0"
      >
        <span class="tags-input__tag">{{ tag }}</span>
        <span class="cursor-pointer" @click="deleteTag(tag)">Remove 🗡️</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from "vue";
import useTagsInput from "./useTagsInput";

export default {
  name: "ComposableTagsList",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const {
      addTag,
      deleteTag,
      handleDeleteKey,
      newTag,
      clearAllTags,
      tagsInputRef,
      pasteHandler,
    } = useTagsInput(props, emit);

    onMounted(() => {
      tagsInputRef.value?.addEventListener("paste", pasteHandler);
    });

    return {
      addTag,
      clearAllTags,
      deleteTag,
      handleDeleteKey,
      newTag,
      tagsInputRef,
    };
  },
};
</script>

<style scoped lang="pcss">

.tags-list__input {
  @apply outline-none flex px-2 py-1 border border-gray-300 rounded-md focus-within:border-blue-400 hover:border-blue-400 transition-colors;
}

.tags-input__tag {
  @apply  text-sm bg-pink-500 rounded text-white px-2 py-1 items-center cursor-default mr-1 mb-1;
}
</style>
