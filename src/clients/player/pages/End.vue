<template>
  <!-- <div> -->
    <!--
    <div class="flex-grow-shrink flex-container" style="flex-basis: 50%;">
      <div class="title">
      </div>
      <div class="subtitle">
      </div>
    </div>
    -->

    <!-- <div class="flex-grow-noshrink flex-container"> -->
      <!-- This is the end screen -->
      <div class="toast" style="text-align: justify;">
        <template v-if="result === 0">
          You are a logical thinker who can see things for what they are and has a
          strong ability to judge.
        </template>

        <template v-else-if="result === 1">
          You are a person who has both logical and pictorial thinking, with a
          high aesthetic as well as rational thinking.
        </template>

        <template v-else> <!-- result >== 2 -->
          You are an artist body person, good at image thinking, able to find
          beauty in the details of life and create beauty.
        </template>
      </div>
    <!-- </div> -->

    <!--
    <div class="flex-grow-shrink" style="flex-basis: 50%;">
    </div>
    -->
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      result: 0,
      playerState: this.$experience.playerState,
    };
  },
  created() {
    const { totalScore, minScore, maxScore } = this.playerState.getValues();
    const deltaScore = maxScore - minScore;
    this.percent = deltaScore > 0 ? (totalScore - minScore) / deltaScore : 0;
    this.result = Math.floor(this.percent * 3);
    console.log(this.percent, this.result);
  }
};
</script>