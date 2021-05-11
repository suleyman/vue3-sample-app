import { createStore } from "vuex";

export interface State {
  user: null | object;
  showLoginModal: boolean;
  showMobileMenu: boolean;
}

export const store = createStore<State>({
  state() {
    return {
      user: null,
      showLoginModal: false,
      showMobileMenu: false,
    };
  },
  actions: {
    login({ commit }, payload) {
      commit("LOGIN", payload);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    showMobileMenu({ commit }) {
      commit("SHOW_MOBILE_MENU");
    },
    hideMobileMenu({ commit }) {
      commit("HIDE_MOBILE_MENU");
    },
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload;
    },
    LOGOUT(state) {
      state.user = null;
    },
    SHOW_MOBILE_MENU(state) {
      state.showMobileMenu = true;
    },
    HIDE_MOBILE_MENU(state) {
      state.showMobileMenu = false;
    },
  },
});
