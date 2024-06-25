<template>
    <button v-if="$store.state.notification.message !== ''" @click="$store.state.notification.message = ''" 
        style="position: fixed; bottom: 50px; right: 50px; color: green" class="btn bg-white border rounded py-2 px-3" >
        <div class="d-flex gap-3 gap-0" style="color: red;">
            <!-- <div v-if="$store.state.notification.loader === true">
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading ...</span>
            </div> -->
            <div :class="`sb-nav-link-icon`" :style="{color:green}"><i :class="`${$store.state.notification.ok === true ? 'fa-regular fa-circle-check' : 'fa-regular fa-circle-xmark'}`"></i></div>
            {{ $store.state.notification.message }}
        </div>
    </button>
    <div v-else></div>
</template>