import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  ceshi () {
    console.log('ceshi')
  },
  login ({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' || username === 'jerry') {
          commit('SET_TOKEN', username)
          setToken(username)
          resolve()
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 1000)
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const roles = state.token === 'admin' ? ['admin'] : ['editor']
        commit('SET_ROLES', roles)
        resolve({ roles })
      }, 1000)
    })
  },
  // remove token
  resetToken ({ commit, state }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
