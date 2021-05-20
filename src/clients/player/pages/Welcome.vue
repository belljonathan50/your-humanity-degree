<template>
  <div class="flex-container" style="padding: 1.5em;">
    <div>
      <div style="padding: .75em 0;">
        This project is dedicated to Beethoven’s 250th anniversary
      </div>

      <div style="padding: .75em 0;">
        Duration ca. 15 min.
      </div>

      <div style="padding: .75em 0;">
        &ldquo;The reason for friendship requires the greatest similarity of the souls and hearts of men.&rdquo;
        <div style="width: 100%; text-align: right;"> --Beethoven </div>
      </div>

      <div style="padding: .75em 0;">
        Let's see how close your souls are to Beethoven!
        <div style="width: 100%; text-align: right;"> --Huihui </div>
      </div>

      <div style="padding: .75em 0;">
        <div style="font-style:italic !important;">
          The tests are innominate, please answer the questions honestly, at the end of the game you will receive a score.
        </div>
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
  // todo : reset score here ?
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