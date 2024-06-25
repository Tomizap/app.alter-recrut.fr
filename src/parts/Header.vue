<template>
    <div v-if="$store.state.user === null"
        class="sb-topnav navbar navbar-expand navbar-dark gap-1 px-2 justify-content-between">
        <div class="d-flex gap-2 align-items-center">
            <img v-if="$store.state.project.links.logo !== ''" :src="$store.state.project.links.logo" width="50px"
                alt="">
            <router-link class="navbar-brand ps-3" to="/">{{ $store.state.project.name }}</router-link>
        </div>
        <select class="form-select" style="max-width: 120px;">
            <option value="en">English</option>
            <option selected value="fr">Français</option>
        </select>
    </div>
    <nav v-else class="sb-topnav navbar navbar-expand navbar-dark gap-1 px-2 bg-white"
        style="border-bottom: solid 1px black;">
        <!-- Navbar Brand-->
        <img :src="$store.state.project.links.logo" width="50px" alt="">
        <router-link class="navbar-brand ps-3" to="/">{{ $store.state.project.name }}</router-link>
        <!-- Sidebar Toggle-->
        <button class="btn btn-sm order-1 order-lg-0 ms-2 me-4 me-lg-0 p-2 px-3" id="sidebarToggle" href="#!"><i
                class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <!-- <div class="input-group">
                <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
            </div> -->
        </form>
        <!-- Data Loader -->
        <!-- <div v-if="$store.state.apiLoader">
            <Spinner color="text-light" size="22px" style="margin-top: 4px; margin-right: 8px"></Spinner>
        </div>
        <div v-else class="collapse"></div> -->
        <!-- Notifications -->
        <!-- Multi Language -->
        <select class="form-select" style="max-width: 120px;">
            <option selected value="fr">Français</option>
            <option value="en">English</option>
        </select>
        <!-- Setting -->
        <router-link class="btn icon" to="/setting">
            <i class="fa-solid fa-gear"></i>
        </router-link>
        <!-- Profil -->
        <router-link class="btn icon" to="/profil">
            <i class="fa-regular fa-user"></i>
        </router-link>
        <!-- Logout -->
        <button type="button" class="btn icon" @click="logout">
            <i class="fa-solid fa-right-from-bracket"></i>
        </button>
    </nav>
</template>

<script>
export default {
    mounted() {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
                document.body.classList.toggle('sb-sidenav-toggled');
            }
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            document.location.reload()
        },
        changeLanguage() {

        }
    }
}
</script>