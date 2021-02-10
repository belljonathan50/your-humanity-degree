<template>
  <div class="image-scrambler">
    <div v-for="r in rows">
      <div
        v-for="k in columns"
        :ref="`${k}-${r}-tile`"
        :style="{
          'background-image': `url(/images/${image})`,
          'background-position': offsets[r - 1][k - 1], // WTF VueJS ???
          'background-size': `${100 * columns}%`,
        }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // NB : the image must be of the right dimensions !!!!!
  // e.g if columns == rows it must be square
  props: ['columns', 'rows', 'image'],
  data() {
    return {
      indices: null,
    };
  },
  computed: {
    offsets() {
      const res = [];
      for (let r = 0; r < this.rows; r++) {
        const row = [];
        for (let k = 0; k < this.columns; k++) {
          const currentIndex = k + (this.columns * r);
          const scrambledIndex = this.indices[currentIndex];
          const coords = this.coordsFromIndex(scrambledIndex);
          const offsetCssString = `${100 * coords.k / (this.columns - 1)}% ${100 * coords.r / (this.columns - 1)}%`;
          row.push(offsetCssString);
        }
        res.push(row);
      }
      return res;
    },
  },
  created() {
    this.scramble();
  },
  methods: {
    scramble() {
      const length = this.columns * this.rows;
      this.indices = [];
      const normalIndices = [];

      for (let i = 0; i < length; i++) {
        normalIndices.push(i);
        // this.indices.push(i);
      }

      //*
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * normalIndices.length);
        this.indices.push(normalIndices.splice(randomIndex, 1)[0]);
      }
      //*/
    },
    coordsFromIndex(i) {
      const r = Math.floor(i / this.columns);
      const k = i % this.columns;
      // console.log(i, r, k);
      return { r, k };
    },
  },
};
</script>