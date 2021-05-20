<template>
  <div
    class="toast notification pink"
    style="text-align: justify;"
    v-html="content">
    <!-- {{ content }} -->
  </div>
</template>

<script>
export default {
  props: [ 'content' ],
};
</script>

