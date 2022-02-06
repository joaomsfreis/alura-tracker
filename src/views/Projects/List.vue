<template>
  <section>
    <router-link to="/projects/new" class="button">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
    <span>Novo projeto 4</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody v-for="project in projects" :key="project.id">
        <tr>
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link class="button" :to="`/projects/${project.id}`">
              <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="remove(project.id)">
              <span class="icon is-small">
                  <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { REMOVE_PROJECT } from "@/store/mutations-type";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "List",
  methods: {
      remove(id: string) {
          this.store.commit(REMOVE_PROJECT, id)
      }
  },
  setup() {
      const store = useStore();
      return {
          store,
          projects: computed(() => store.state.projects)
      }
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
