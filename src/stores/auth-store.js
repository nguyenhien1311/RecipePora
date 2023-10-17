import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    account: {},
  }),
  getters: {
    isLoggedIn: (state) => state.account?.user?.email,
    token: (state) => state.account?.token,
    ME: (state) => state.account,
  },
  actions: {
    signIn(account) {
      this.account = account;
    },
    async signOut() {
      this.account = {};
    },
  },
});
