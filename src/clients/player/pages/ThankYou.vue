<template>
  <!--
  <div>
    <div class="flex-container flex-grow-noshrink" style="height: 50%;">
      <div class="title">
        Thank you for participating !
      </div>
    </div>
    <div class="flex-container flex-grow-noshrink" style="height: 50%;">
      <div style="padding: 1.5em;">
        <div> Some text to insert here </div>
      </div>
    </div>
  </div>
  -->
  <div>
    <div class="flex-grow-shrink flex-container" style="flex-basis: 50%;">
      <div class="title"> Thank you for participating ! </div>
      <div>
        <!-- put something here ? -->
      </div>
    </div>

    <div class="flex-grow-noshrink">
      <div class="pads-wrapper beethoven">
        <pad-surface
          :columns="9"
          :rows="9"
          :disableTouchEvents="true"
          :disablePadAnimations="true"
          :disabledPads="[]"
          :enabledStroke="false"
          :disabledStroke="false"
        />
      </div>
    </div>

    <div class="flex-grow-shrink" style="flex-basis: 50%;"></div>
  </div>
</template>

<script>
import PadSurface from '../components/PadSurface.vue';

export default {
  components: { PadSurface },
};
</script>