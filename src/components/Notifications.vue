<template>
  <div class="notifications">
    <article
      class="message"
      v-for="notification in notifications"
      :class="context[notification.type]"
      :key="notification.id"
    >
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">{{ notification.text }}</div>
    </article>
  </div>
</template>

<script>
import { NotificationType } from "@/interfaces/INotification";
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Notifications",
  data: () => ({
    context: {
      [NotificationType.SUCCESS]: "is-success",
      [NotificationType.WARNING]: "is-warning",
      [NotificationType.FAIL]: "is-danger",
    },
  }),
  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 100;
}
</style>
