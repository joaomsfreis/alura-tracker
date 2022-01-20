<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo" />
    </h1>
    <button class="button" @click="alterMode">{{ buttonText }}</button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link class="link" to="/">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/projects">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ["toAlterMode"],
  data() {
    return {
      darkMode: false,
    };
  },
  computed: {
    buttonText() {
      return this.darkMode ? "Desativar modo escuro" : "Ativar modo escuro";
    },
  },
  methods: {
    alterMode() {
      this.darkMode = !this.darkMode;
      this.$emit("toAlterMode", this.darkMode);
    },
  },
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>