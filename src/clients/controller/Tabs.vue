<template>
  <div
    style="
      background-color: #ccc;
    ">
    <template v-for="(page, i) in pages">
      <div v-if="page !== 'loader'"
        :style="`
          display: inline-block;
          ${i !== 0 ? 'border-left: 1px solid #ccc;' : ''}
          padding: 10px;
          ${page === currentPage
        ? 'color: white; background-color: #aaa;'
        : 'color: black; background-color: #ccc;'}
        `"
        @click="$emit('tab', page)">
        {{ page }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: [ 'pages', 'currentPage' ]
};
</script>