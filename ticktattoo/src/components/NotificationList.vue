<template>
    <div class="absolute top-18 right-36 z-50 space-y-1 w-full max-w-xs">
        <NotificationComponent
            v-for="(item, index) in items"
            :key="index"
            :message="item.message"
            :date="item.date"
            :name="item.name.studio_name"
            :state="item.state"
            :studioId= "item.name.UserID"
            @remove="remove(index)"
            @hide="handleHide"
            />

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NotificationComponent from './NotificationComponent.vue';

export default {
  name: 'NotificationList',
  components: {
    NotificationComponent,

  },
  computed: {
    ...mapGetters(['notifications', 'notificationCount']),
    items() {
      return this.notifications;
    },
  },
  emits: ['update-count', 'finishAct'],
  async mounted() {
    await this.fetchNotifications();
    this.$emit('update-count', this.notificationCount);
  },
  methods: {
    ...mapActions(['fetchNotifications']),
    remove(index) {
      this.$store.commit('removeNotification', index);
      this.$emit('update-count', this.notificationCount);
    },
    handleHide() {
      this.$emit('finishAct');
    },
  },
};

</script>


<style>

</style>
