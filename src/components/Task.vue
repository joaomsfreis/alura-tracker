<template>
  <Box>
    <div class="columns clickable" @click="clickedTask">
      <div class="column is-4">
        {{ task.description || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ task.project?.name || 'N/D' }}
      </div>
      <div class="column">
        <Stopwatch :timeInSeconds="task.seconds" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import ITask from "@/interfaces/ITask";
import { defineComponent, PropType } from "vue";
import Box from "./Box.vue";
import Stopwatch from "./Stopwatch.vue";

export default defineComponent({
  name: "Task",
  components: { Stopwatch, Box },
  emits: ['onClickedTask'],
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  methods: {
    clickedTask(): void {
        this.$emit('onClickedTask', this.task);
    }
  }
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
