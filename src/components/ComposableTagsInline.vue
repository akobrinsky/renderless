<template>
  <div class="tags-inline">
    <span
      v-for="(tag, idx) in modelValue"
      :key="`${idx}__${tag}`"
      class="tags-inline__tag"
      >{{ tag
      }}<span class="px-1 cursor-pointer" @click="deleteTag(tag)">X</span></span
    >

    <input
      v-model="newTag"
      type="text"
      placeholder="Add tag"
      class="tags-inline__input"
      @keyup.enter="addTag"
      @keyup.space="addTag"
      @keyup.delete="handleDeleteKey"
    />
  </div>
</template>

<script>
import useTagsInput from "./useTagsInput";

export default {
  name: "ComposableTags",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { addTag, deleteTag, handleDeleteKey, newTag } = useTagsInput(
      props,
      emit
    );
    return {
      addTag,
      newTag,
      deleteTag,
      handleDeleteKey,
    };
  },
};
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
