<template>
  <Form @toSave="saveTask" />
  <div class="list">
    <Box v-if="emptyList"> Você não está muito produtivo hoje :( </Box>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @onClickedTask="selectTask"
    />
    <Modal :show="selectedTask != null">
      <template v-slot:header>
        <p class="modal-card-title">Editanto tarefa</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="task-description" class="label">Nome do projeto</label>
          <input
            type="text"
            class="input"
            name="task-description"
            id="task-description"
            v-model="selectedTask.description"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="alterTask">
          Salvar alteração
        </button>
        <button class="button" @click="closeModal">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Form from "@/components/Form.vue";
import Task from "@/components/Task.vue";
import Box from "@/components/Box.vue";
import { useStore } from "@/store";
import {
  ALTER_TASK,
  GET_PROJECTS,
  GET_TASKS,
  STORE_TASK,
} from "@/store/actions-type";
import ITask from "@/interfaces/ITask";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "Tasks",
  components: { Form, Task, Box, Modal },
  data: () => ({
    selectedTask: null as ITask | null,
  }),
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    const filter = ref("");

    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value);
    });

    return {
      store,
      filter,
      tasks: computed(() => store.state.task.tasks),
    };
  },
  computed: {
    emptyList(): boolean {
      return this.tasks?.length === 0;
    },
  },
  methods: {
    saveTask(task: ITask) {
      this.store.dispatch(STORE_TASK, task);
    },
    selectTask(task: ITask) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
    alterTask() {
      this.store
        .dispatch(ALTER_TASK, this.selectedTask)
        .then(() => this.closeModal());
    },
  },
});
</script>
