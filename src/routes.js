// view
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Password from './views/Password.vue'

// pages
import Home from './pages/Home.vue'
import Profil from './pages/Profil.vue'
import Setting from './pages/Setting.vue'

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
                component: Home,
            },
            // Profil
            {
                path: 'profil',
                name: 'Profil',
                component: Profil,
            },
            // Setting
            {
                path: 'setting',
                name: 'Setting',
                component: Setting,
            },
            // Custom ...
            {
                path: ':collection',
                component: ListItems,
                children: [
                    {
                        path: ":id/jobs/:subitemid",
                        component: SideItem,
                    },
                    {
                        path: ":id/recruiters/:subitemid",
                        component: SideItem,
                    },
                    {
                        path: ":id",
                        component: SideItem,
                    },
                ]
            },
        ]
    }
]

export default routes;

