<script>
import { ref } from "vue";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    sortBy: {
      type: String,
      default: "name",
    },
  },
  setup(props, { slots }) {
    const sorted = ref(false);
    const sortedItems = ref(props.items);

    const sortComparator = (a, b) => {
      return props.sortBy === "name"
        ? a[props.sortBy].localeCompare(b[props.sortBy])
        : a[props.sortBy] - b[props.sortBy];
    };

    const sortHandler = () => {
      const itemsCopy = [...props.items];
      sorted.value = !sorted.value;
      if (sorted.value) {
        sortedItems.value.reverse();
        return;
      }

      sortedItems.value = itemsCopy.sort(sortComparator);
    };

    const resetHandler = () => {
      sorted.value = false;
      sortedItems.value = props.items;
    };

    return () =>
      slots.default({
        sortedItems: sortedItems.value,
        sortHandler,
        resetHandler,
      });
  },
};
</script>
