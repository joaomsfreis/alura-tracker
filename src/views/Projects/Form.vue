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
import { defineComponent, ref } from "vue";
import useNotifier from "@/hooks/notifier";
import { ALTER_PROJECT, STORE_PROJECT } from "@/store/actions-type";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Form",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notify } = useNotifier();

    const projectName = ref("");
    if (props.id) {
      const project = store.state.project.projects.find(
        (proj) => proj.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const isSuccess = () => {
      notify(
        NotificationType.SUCCESS,
        "Sucesso!",
        "Pronto! Seu projeto já está disponível!"
      );
      projectName.value = "";
      router.push("/projects");
    };

    const save = () => {
      if (props.id) {
        store
          .dispatch(ALTER_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => isSuccess());
      } else {
        store.dispatch(STORE_PROJECT, projectName.value).then(() => {
          isSuccess();
        });
      }
    };

    return {
      projectName,
      save,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
