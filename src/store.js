import { createStore } from 'vuex';
import VueCookies from 'vue-cookies';
import project from './assets/project.js'
import pipelines from './pipelines.js';
import collections from "./collections.js"

var state = {
  user: null,
  notification: {
    ok: true,
    message: '',
    loader: false,
  },
  project,
  loader: {
    view: false,
    page: false,
    data: false,
    item: false
  },
  modals: {
    sendEmail: {
      to: "",
      html: ''
    }
  },
  item: {
    data: null,
    async reload() { }
  },
  sideItem: {
    data: null,
    async reload() { }
  },
  items: {
    data: [],
    getData() { return [] },
    showFilters: false,
    selector: {},
    view: 'fields',
    item: null,
  },
  subItems: {
    data: {},
    reload() { }
  },
  pipelines,
  collections,
  windows: {
    add(window) {
      window.id = "window-" + Math.round((1 + (Math.random() * 10)) ^ 999999999999999)
      if (!window.position) window.position = 'sidebar'
      if (!window.item) window.position = 'sidebar'
      if (!window.emailConfig) window.position = 'sidebar'
      if (!window.config) window.position = 'sidebar'
      this.list.push(window)
      console.log(this.list);
    },
    delete(windowId) {
      const windowIndex = this.list.findIndex(window => window.id === windowId)
      console.log(windowIndex);
      this.list.splice(windowIndex, 1)
      console.log(this.list);
    },
    list: []
  }
}

const store = createStore({
  state,
  mutations: {
    setNotification(state, notification) {
      state.notification.ok = notification.ok
      state.notification.message = notification.message
      clearTimeout(state.notification.timeout)
      notification.timeout = setTimeout(() => {
        state.notification.message = ""
      }, 3000);
      state.notification.timeout = notification.timeout
    },
  },
  actions: {
    logout({ commit }) {
      commit('setUser', null);
      VueCookies.remove('email');
      VueCookies.remove('token');
      document.location.replace('/login')
    },
    notify({ commit }, notification) { commit('setNotification', notification) },
  }
});

export default store;
