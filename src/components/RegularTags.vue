<template>
  <div class="input-tags">
    <span
      v-for="(tag, idx) in modelValue"
      :key="`${idx}__${tag}`"
      class="input-tags__tag"
      >{{ tag }}</span
    >
    <input
      ref="tagsInputRef"
      v-model="newTag"
      type="text"
      class="input-tags__input"
      placeholder="Add tag"
      @keyup.enter="onAddTag"
      @keyup.space="onAddTag"
      @keyup.delete="handleDeleteKey"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emit = defineEmits(["update:modelValue"]);
const newTag = ref("");
const tagsInputRef = ref(null);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const onAddTag = () => {
  if (
    newTag.value.trim().length === 0 ||
    props.modelValue.includes(newTag.value)
  ) {
    return;
  }
  emit("update:modelValue", [...props.modelValue, newTag.value]);
  newTag.value = "";
};

const handleDeleteKey = () => {
  if (newTag.value.length === 0) {
    emit("update:modelValue", props.modelValue.slice(0, -1));
  }
};

onMounted(() => {
  tagsInputRef.value.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasteInfo = e.clipboardData.getData("Text");

    const pastedSplit = pasteInfo.split(",");
    const pastedVals = [];
    pastedSplit.forEach((val) => {
      const newVal = val.trim();
      if (!props.modelValue.includes(newVal)) pastedVals.push(newVal);
    });
    emit("update:modelValue", [...props.modelValue, ...pastedVals]);
  });
});
</script>

<style scoped lang="pcss">
.input-tags {
  @apply px-2 pt-2 pb-1 rounded-lg flex flex-wrap border border-gray-300 bg-white focus-within:border-blue-300 hover:border-blue-300 transition-colors;
}
.input-tags__input {
  @apply outline-none flex py-1 min-w-[10rem] border-none flex-1 mb-1 ml-1 text-sm leading-3;
}
.input-tags__tag {
  @apply inline-flex text-sm bg-green-400 rounded text-white p-1 items-center cursor-pointer mr-1 mb-1 leading-4;
}
</style>
