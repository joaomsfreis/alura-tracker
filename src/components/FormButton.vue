<template>
    <button class="button" @click="clicked" :disabled="stopwatchIsRunning">
      <span class="icon">
        <i :class="icon"></i>
      </span>
      <span>{{ text }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormButton",
  emits: ['clickOnButton'],
  props: {
      stopwatchIsRunning: {
          type: Boolean,
          default: false
      },
      icon: {
          type: String,
          default: ''
      },
      text: {
          type: String,
          default: ''
      }
  },
  methods: {
      clicked() {
          this.$emit('clickOnButton');
      }
  }
});
</script>
