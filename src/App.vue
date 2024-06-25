<template>
  <PageLoader v-if="$store.state.pageLoader === true"></PageLoader>
  <router-view v-else></router-view>
  
  <button v-if="$store.state.notification.message !== ''" @click="$store.state.notification.message = ''" 
    style="position: fixed; bottom: 50px; right: 50px; z-index:99999" class="btn bg-white border rounded py-2 px-3" >
    <div class="d-flex gap-3">
        <div :class="`sb-nav-link-icon text-${$store.state.notification.ok ? 'success' : 'danger'}`">
          <i :class="$store.state.notification.ok === true ? 'fa-regular fa-circle-check' : 'fa-regular fa-circle-xmark'"></i>
        </div>
        {{ $store.state.notification.message }}
    </div>
  </button>
</template>