<template>
  <Form @toSave="saveTask" />
  <div class="list">
    <Box v-if="emptyList"> Você não está muito produtivo hoje :( </Box>
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Form from "@/components/Form.vue";
import Task from "@/components/Task.vue";
import Box from "@/components/Box.vue";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "Tasks",
  components: { Form, Task, Box },
  data() {
    return {
      tasks: [] as ITask[]
    };
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task);
    }
  },
});
</script>
