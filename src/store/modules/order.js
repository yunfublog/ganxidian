const state = {
  selectStatus: 1000,
}

const mutations = {
  CHANGE_STATUS: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeStatus({ commit }, data) {
    commit('CHANGE_STATUS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

