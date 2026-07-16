<script setup lang="ts">
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/markdown.css';

const props = defineProps<{
  content: string;
  className?: string;
}>();
</script>

<template>
  <div :class="`nr-prose ${props.className || ''}`">
    <NRpreviewer :content="props.content" :tailwindCDN="true" />
  </div>
</template>
