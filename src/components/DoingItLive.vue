<script>
import { ref } from "vue";

export default {
  props: {
    objects: {
      type: Array,
      default: () => [],
    },
    sortBy: {
      type: String,
      default: "name",
    },
  },
  setup(props, { slots }) {
    const sortToggle = ref(false);
    const sortedOjects = ref(props.objects);

    const sortComparator = (a, b) => {
      return props.sortBy === "name"
        ? a[props.sortBy].localeCompare(b[props.sortBy])
        : a[props.sortBy] - b[props.sortBy];
    };

    const sortHandler = () => {
      const objectsCopy = [...props.objects];
      sortToggle.value = !sortToggle.value;
      if (sortToggle.value) {
        sortedOjects.value.reverse();
        return;
      }

      sortedOjects.value = objectsCopy.sort(sortComparator);
    };

    const resetHandler = () => {
      sortToggle.value = false;
      sortedOjects.value = props.objects;
    };

    return () =>
      slots.default({
        objects: props.objects,
        sortedOjects: sortedOjects.value,
        sortHandler,
        resetHandler,
      });
  },
};
</script>
