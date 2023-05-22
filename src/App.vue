<template>
  <div class="app-layout">
    <SlotExample>
      <template #default="slotProps">
        <h1>{{ slotProps.title }}</h1>
      </template>
    </SlotExample>
    <div class="w-[500px] flex flex-col gap-y-8">
      <div>
        <p>Renderless Example</p>
        <DoingItLiveWrapper />
      </div>

      <div>
        <p>Regular Implementation</p>
        <RegularTags v-model="tags" />
      </div>

      <div>
        <p>Renderless Implementation: Inline</p>
        <RenderlessTagsInline v-model="inlineTags" />
      </div>

      <div>
        <p>Renderless Implementation: List</p>
        <RenderlessTagsList v-model="inlineTags" />
      </div>

      <div>
        <p>Composable Implementation: Inline</p>
        <ComposableTags v-model="composableTags" />
      </div>

      <div>
        <p>Composable Implementation: List</p>
        <ComposableTagsList v-model="composableTagsList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RegularTags from "./components/RegularTags.vue";
import RenderlessTagsInline from "./components/RenderlessTagsInline.vue";
import RenderlessTagsList from "./components/RenderlessTagsList.vue";
import ComposableTags from "./components/ComposableTagsInline.vue";
import ComposableTagsList from "./components/ComposableTagsList.vue";
import DoingItLiveWrapper from "./components/DoingItLiveWrapper.vue";
import SlotExample from "./components/SlotExample.vue";

const tags = ref(["(づ｡◕‿‿◕｡)づ"]);
const inlineTags = ref([]);
const composableTags = ref([]);
const composableTagsList = ref([]);
</script>
