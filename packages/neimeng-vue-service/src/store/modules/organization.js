export default {
  state: {
    currentNode: {},
  },
  mutations: {
    setCurrentNode(state, provider) {
      state.currentNode = provider;
    },
  },
  actions: {
    changeCurrentNode(context, payload) {
      context.commit('setCurrentNode', payload);
    },
  },
};
