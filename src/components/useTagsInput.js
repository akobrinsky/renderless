import { ref } from "vue";

function useTagsInput(props, emit) {
  const newTag = ref("");
  const tagsInputRef = ref(null);

  const addTag = () => {
    if (
      newTag.value.trim().length === 0 ||
      props.modelValue.includes(newTag.value)
    ) {
      return;
    }
    emit("update:modelValue", [...props.modelValue, newTag.value.trim()]);
    newTag.value = "";
  };

  const deleteTag = (deletedTag) => {
    emit(
      "update:modelValue",
      props.modelValue.filter((val) => val !== deletedTag)
    );
  };

  const handleDeleteKey = () => {
    if (newTag.value.length === 0) {
      emit("update:modelValue", props.modelValue.slice(0, -1));
    }
  };

  const clearAllTags = () => {
    emit("update:modelValue", []);
  };

  const pasteHandler = (e) => {
    e.preventDefault();
    const pasteInfo = e.clipboardData.getData("Text");

    const pastedSplit = pasteInfo.split(/[\n,\s+]/);
    const pastedVals = [];
    pastedSplit.forEach((val) => {
      const newVal = val.trim();
      if (!props.modelValue.includes(newVal) && newVal.length)
        pastedVals.push(newVal);
    });
    emit("update:modelValue", [...props.modelValue, ...pastedVals]);
  };

  return {
    addTag,
    newTag,
    deleteTag,
    handleDeleteKey,
    clearAllTags,
    tagsInputRef,
    pasteHandler,
  };
}

export default useTagsInput;
