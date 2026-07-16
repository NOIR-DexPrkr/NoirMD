<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/markdown.css';

const props = defineProps<{
  initialContent: string;
}>();

const content = ref(props.initialContent);

function handler(e: Event) {
  const md = (e as CustomEvent).detail?.markdown;
  if (typeof md === 'string') content.value = md;
}

onMounted(() => window.addEventListener('playground-change', handler));
onUnmounted(() => window.removeEventListener('playground-change', handler));
</script>

<template>
  <div class="nr-prose">
    <NRpreviewer :content="content" :tailwindCDN="true" />
  </div>
</template>
