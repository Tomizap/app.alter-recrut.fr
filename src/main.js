import { createApp } from 'vue'
import axios from 'axios';

import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'

import api from './api.js'

// assets
import 'bootstrap'
import './assets/bootstrap.css'
import './assets/style.css'

import App from './App.vue'

// parts
import Header from './parts/Header.vue'
import Footer from './parts/Footer.vue'
import Sidebar from './parts/Sidebar.vue'
import Content from './parts/Content.vue'

// parts
import AddNewSubItem from './features/AddNewSubItem.vue'
import Coordonees from './features/Coordonees.vue'
import SubItemsList from './features/SubItemsList.vue'

// COMPONENTS
import Box from './components/Box.vue'
import Notification from './components/Notification.vue'
import Table from './components/Table.vue'
import Form from './components/Form.vue'
import Field from './components/Field.vue'
import PageLoader from './components/PageLoader.vue'
import Loader from './components/Loader.vue'
import Spinner from './components/Spinner.vue'
import ProfilCard from './components/ProfilCard.vue'
import Submit from './components/Submit.vue'
import Task from './components/Task.vue'
import Tasklist from './components/Tasklist.vue'
import Window from './components/Window.vue'

import routes from './routes.js'
import store from './store.js'

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const app = createApp(App)

// Ajouter Axios aux propriétés globales de Vue
app.config.globalProperties.$api = api
app.config.globalProperties.$axios = axios.create()

// Middleware
app.use(VueCookies)
app.use(router)
app.use(store)

// Template parts
app.component('Header', Header)
app.component('Footer', Footer)
app.component('Content', Content)
app.component('Sidebar', Sidebar)

// Features
app.component('AddNewSubItem', AddNewSubItem)
app.component('Coordonees', Coordonees)
app.component('SubItemsList', SubItemsList)

// Global components
app.component('Box', Box)
app.component('Notification', Notification)
app.component('Table', Table)
app.component('Form', Form)
app.component('Field', Field)
app.component('Spinner', Spinner)
app.component('Loader', Loader)
app.component('PageLoader', PageLoader)
app.component('Submit', Submit)
app.component('ProfilCard', ProfilCard)
app.component('Tasklist', Tasklist)
app.component('Task', Task)
app.component('Window', Window)

// Mount
app.mount('#app')
