import { createStore } from "vuex";

const initialState = () => {
  return {
    loading: false,
  };
};

export default createStore({
  state: initialState,
  mutations: {
    loadingState(state, boolean) {
      state.loading = boolean;
    },
  },
});
