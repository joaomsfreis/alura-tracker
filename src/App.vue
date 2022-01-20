<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': darkModeActived }">
    <div class="column is-one-quarter">
      <SideBar @toAlterMode="alterMode" />
    </div>
    <div class="column is-three-quarter content">
      <Notifications />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notifications from "./components/Notifications.vue";
import SideBar from "./components/SideBar.vue";
import ITask from "./interfaces/ITask";

export default defineComponent({
  name: "App",
  components: { SideBar, Notifications },
  data() {
    return {
      darkModeActived: false,
    };
  },
  methods: {
    alterMode(darkMode: boolean) {
      this.darkModeActived = darkMode;
    },
  },
});
</script>

<style>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.list {
  padding: 1.25rem;
}

.content {
  background-color: var(--bg-primary);
}
</style>