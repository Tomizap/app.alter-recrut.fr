<template>
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">

                    <router-link class="nav-link btn mt-2" :to="'/companies'"
                        :class="$route.path.includes('/companies') ? 'text-secondary' : ''">
                        <div class="sb-nav-link-icon"><i class="fa-solid fa-school"></i></div>
                        <b v-if="$route.path.includes('/companies')" class="text-primary">Companies</b>
                        <div v-else>Companies</div>
                    </router-link>
                    <router-link class="nav-link btn mt-2" :to="'/recruiters'"
                        :class="$route.path.includes('/recruiters') ? 'text-secondary' : ''">
                        <div class="sb-nav-link-icon"><i class="fa-solid fa-school"></i></div>
                        <b v-if="$route.path.includes('/recruiters')" class="text-primary">Recruiters</b>
                        <div v-else>Recruiters</div>
                    </router-link>
                    <router-link class="nav-link btn mt-2" :to="'/jobs'"
                        :class="$route.path.includes('/jobs') ? 'text-secondary' : ''">
                        <div class="sb-nav-link-icon"><i class="fa-solid fa-school"></i></div>
                        <b v-if="$route.path.includes('/jobs')" class="text-primary">Jobs</b>
                        <div v-else>Jobs</div>
                    </router-link>

                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                {{ $store.state.user.email }}
            </div>
        </nav>
    </div>
</template>