<template>
  <div class="toast">
    <div v-html="content"></div>
    <!-- {{ content }} -->
  </div>
</template>

<script>
export default {
  props: [ 'content' ],
};
</script>

