<template>
  <div class="toast">
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: [ 'content' ],
};
</script>

