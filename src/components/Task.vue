<template>
  <Box>
    <div class="columns">
      <div class="column is-7">
        {{ task.description || "Tarefa sem descrição" }}
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
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
});
</script>
