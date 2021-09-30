/*
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-20 15:02:50
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-13 14:32:09
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/utils/request";
import { employerRoutes, developerRoutes } from '@/router'
import { setToken, removeToken, setUserInfo, removeUserInfo } from "@/utils/auth";

Vue.use(Vuex)

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    console.log(tmp);
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: {
      username: '',
      avatar: '',
      roles: []
    },
    routes: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      // 在localStorage中存储token
      setToken(JSON.stringify(token))
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setUserInfo(JSON.stringify((userInfo)));
    },
    setRoutes(state, asyncRoutes) {
      // state.addRoutes = routes
      // state.routes = constantRoutes.concat(routes)
      state.routes = asyncRoutes;
    }
  },
  actions: {
    /**
     * 异步登录
     * @param state
     * @param data
     */
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/user/login', data).then(response => {
          commit("setToken", response);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 异步登出
     * @param state
     */
    logout({ dispatch }) {
      return new Promise((resolve) => {
        dispatch('resetToken');
        resolve()
      });
    },
    /**
     * 获取登录详细用户信息
     * @param commit
     * @return {Promise<unknown>}
     */
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/user/getUserInfo').then(response => {
          const { roles, username, icon, userId } = response

          // roles 必须是一个非空的数组
          if (!roles || roles.length <= 0) {
            reject('getUserInfo: roles 必须是一个非空的数组!')
          }

          commit('setUserInfo', {
            userId,
            roles,
            username,
            avatar: icon
          })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 根据用户的roles动态生成路由
     * @param commit
     * @param roles
     * @return {Promise<unknown>}
     */
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('employer')) {
          accessedRoutes = employerRoutes || []
        } else if (roles.includes('developer')) {
          accessedRoutes = developerRoutes || []
        }
        commit('setRoutes', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    /**
     * 重置token和userInfo信息
     * @param commit
     * @return {Promise<unknown>}
     */
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('setToken', null)
        commit('setUserInfo', {
          username: '',
          avatar: '',
          roles: []
        })
        removeToken()
        removeUserInfo()
        resolve()
      })
    },

  },
  modules: {}
})