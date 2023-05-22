<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    allowSpaces: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
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

    const clearAllTags = () => {
      emit("update:modelValue", []);
    };

    onMounted(() => {
      tagsInputRef.value.addEventListener("paste", pasteHandler);
    });

    return () =>
      slots.default({
        addTag,
        deleteTag,
        handleDeleteKey,
        clearAllTags,
        tags: props.modelValue,
        tagsInputAttrs: {
          value: newTag.value,
          ref: tagsInputRef,
        },
        tagsInputEvents: {
          input: (e) => {
            newTag.value = e.target.value;
          },
          keydown: (e) => {
            const keyActionLookup = {
              13: "add",
              32: props.allowSpaces ? null : "add",
              46: "remove",
              8: "remove",
            };
            const { keyCode } = e;
            if (keyActionLookup[keyCode] === "add") {
              e.preventDefault();
              addTag();
            } else if (keyActionLookup[keyCode] === "remove") {
              handleDeleteKey();
            }
          },
        },
      });
  },
};
</script>
