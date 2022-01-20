<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="project-name" class="label">Nome do projeto</label>
        <input
          type="text"
          class="input"
          name="project-name"
          id="project-name"
          v-model="projectName"
        />
      </div>
      <div class="field">
        <button type="submit" class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { NotificationType } from "@/interfaces/INotification";
import { useStore } from "@/store";
import { ADD_PROJECT, EDIT_PROJECT } from "@/store/mutations-type";
import { defineComponent } from "vue";
import useNotifier from "@/hooks/notifier";

export default defineComponent({
  name: "Form",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (proj) => proj.id === this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data: () => ({
    projectName: "",
  }),
  methods: {
    save() {
      if (this.id) {
        this.store.commit(EDIT_PROJECT, {
          id: this.id,
          name: this.projectName,
        });
      } else {
        this.store.commit(ADD_PROJECT, this.projectName);
      }

      this.notify(
        NotificationType.SUCCESS,
        "Sucesso!",
        "Pronto! Seu projeto já está disponível!"
      );
      this.projectName = "";
      this.$router.push("/projects");
    }
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    return {
      store,
      notify
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
