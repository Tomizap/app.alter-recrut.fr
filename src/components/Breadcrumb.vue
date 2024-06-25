<template>
    <div>
        <router-link v-for="(param, index) in params" :key="index" to=""></router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            domain: "",
            baseUrl: ""
            params: []
        }
    },
}
</script>