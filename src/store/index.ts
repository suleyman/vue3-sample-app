import { createStore } from "vuex";

export interface State {
  user: null | object;
}

export const store = createStore<State>({
  state() {
    return {
      user: null,
    };
  },
  actions: {
    login({ commit }, payload) {
      commit("LOGIN", payload);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload;
    },
    LOGOUT(state) {
      state.user = null;
    },
  },
});
