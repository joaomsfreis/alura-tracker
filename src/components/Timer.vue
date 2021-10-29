<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Stopwatch :timeInSeconds="timeInSeconds" />
    <FormButton @clickOnButton="start" :stopwatchIsRunning="stopwatchIsRunning" icon="fas fa-play" text="play"/>
    <FormButton @clickOnButton="finish" :stopwatchIsRunning="!stopwatchIsRunning" icon="fas fa-stop" text="stop"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormButton from "./FormButton.vue";
import Stopwatch from "./Stopwatch.vue";

export default defineComponent({
  name: "Timer",
  components: { Stopwatch, FormButton },
  emits: ['endedTimer'],
  data() {
    return {
      timeInSeconds: 0,
      stopwatch: 0,
      stopwatchIsRunning: false,
    };
  },
  methods: {
    start() {
      this.stopwatchIsRunning = true;
      this.stopwatch = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
    },
    finish() {
      this.stopwatchIsRunning = false;
      clearInterval(this.stopwatch);

      this.$emit('endedTimer', this.timeInSeconds);

      this.timeInSeconds = 0;
    },
  },
});
</script>
