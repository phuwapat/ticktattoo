import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    items: [],
    loading: false, // Add loading to track when data is being fetched
  },
  mutations: {
    setNotifications(state, notifications) {
      state.items = notifications;
      state.loading = false; // Set loading to false after loading
      console.log('Items set in state:', state.items);
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    async fetchNotifications({ commit }) {
      commit('setLoading', true); // Set loading before fetching data
      try {
        const role = await axios.get('/user/userWithRole');
        const path = role.data.role === 'studio' ? 'studio/notifications' : 'user/notifications';
        console.log('Fetching notifications from:', path);
        const response = await axios.get(path);
        console.log('Response:', response);
        const notifications = response.data.notifications.map((notification) => ({
          message: notification.message,
          date: notification.date,
          name: notification.studio,
          state: notification.state,
          id: notification.booking_id,
        }));

        commit('setNotifications', notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        commit('setLoading', false);
      }
    },
  },
  getters: {
    notificationCount(state) {
      return state.items.length;
    },
    notifications(state) {
      return state.items;
    },
    isLoading(state) {
      return state.loading;
    },
  },
});

export default store;
