<template>
  <div>
    <div class="flex-container flex-grow-noshrink" style="height: 50%;">
      <div class="title">
        Your humanity degree
      </div>
    </div>
    <div class="flex-container flex-grow-noshrink" style="height: 50%;">
      <div style="padding: 1.5em;">
        <div> Dedicated to Beethoven’s 250th anniversary </div>
        <div> Digital version </div>
        <div> For ensemble and smartphones </div>
        <div> Commissioned by Ensemble consord </div>
        <div> Supported by Siemens foundation and BTHVN2020 </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerState: this.$experience.playerState,
    };
  },
  // todo : reset score here
  async mounted() {
    const schema = this.playerState.getSchema();

    await this.playerState.set({
      totalScore: schema.totalScore.default,
      minScore: schema.minScore.default,
      maxScore: schema.maxScore.default,
    });
  },
};
</script>