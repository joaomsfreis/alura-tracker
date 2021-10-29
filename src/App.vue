<template>
  <main class="columns is-gapless is-multiline" :class="{'dark-mode': darkModeActived}">
    <div class="column is-one-quarter">
      <SideBar @toAlterMode="alterMode"/>
    </div>
    <div class="column is-three-quarter content">
      <Form @toSave="saveTask" />
      <div class="list">
        <Box v-if="emptyList">
          Você não está muito produtivo hoje :(
        </Box>
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar.vue";
import Form from "./components/Form.vue";
import Task from "./components/Task.vue";
import ITask from "./interfaces/ITask";
import Box from "./components/Box.vue";

export default defineComponent({
  name: "App",
  components: { SideBar, Form, Task, Box },
  data() {
    return {
      tasks: [] as ITask[],
      darkModeActived: false
    };
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length === 0;
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task);
    },
    alterMode(darkMode: boolean) {
      this.darkModeActived = darkMode
    }
  },
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>