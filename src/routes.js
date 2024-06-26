// view
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Password from './views/Password.vue'

// pages
// import Home from './pages/Home.vue'
// import Profil from './pages/Profil.vue'
// import Setting from './pages/Setting.vue'

// features
// import Company from './features/Company.vue'
// import Job from './features/Job.vue'
// import Recruiter from './features/Recruiter.vue'

// contents
import ListItems from './contents/ListItems.vue'
import SideItem from './contents/SideItem.vue'

// import project from './project'

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/password', name: 'Password', component: Password },
    {
        path: '/', name: 'Dashboard', component: Dashboard, children: [
            // Home
            {
                path: '',
                name: 'Home',
                component: () => import('./pages/Home.vue'),
            },
            // Profil
            {
                path: 'profil',
                name: 'Profil',
                component: () => import('./pages/Profil.vue'),
            },
            // Setting
            {
                path: 'setting',
                name: 'Setting',
                component: () => import('./pages/Setting.vue'),
            },
            // Custom ...
            {
                path: 'companies',
                name: 'Companies',
                component: () => import('./pages/Companies.vue'),
                meta: {
                    config: '/companies'
                }
            },
            {
                path: 'companies/:id',
                name: 'Company',
                component: () => import('./pages/Company.vue'),
            },
            {
                path: 'recruiters',
                name: 'Recruiters',
                component: () => import('./pages/Recruiters.vue'),
                meta: {
                    config: '/recruiters'
                }
            },
            {
                path: 'recruiters/:id',
                name: 'Recruiter',
                component: () => import('./pages/Recruiter.vue')
            },
            {
                path: 'jobs',
                name: 'Jobs',
                component: () => import('./pages/Jobs.vue'),
                meta: {
                    config: '/jobs'
                }
            },
            {
                path: 'jobs/:id',
                name: 'Job',
                component: () => import('./pages/Job.vue')
            },
        ]
    }
]

export default routes;

