<template>
  <div class="p-6px">
    <span class="font-bold">Tab明细页</span>
    <br />
    <span class="font-bold c-#646cff">params:{{ route.params }}</span>
  </div>
</template>

<script setup lang="ts" name="tabsDetailPage">
import { useRoute } from "vue-router";

import useTabsStore from "@/stores/modules/tabs.ts";

const route = useRoute();
const tabsStore = useTabsStore();

tabsStore.setTabTitle(`KOI.${route.params.id} - ${route.meta.title}`);
</script>
