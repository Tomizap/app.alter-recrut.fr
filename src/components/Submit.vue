<template>
    <button @click="sendRequest" :disabled="isLoading" class="btn btn-primary p-2-3 fw-bold">
        <div v-if="isLoading" class="d-flex gap-2 align-items-center justify-content-center w-100">
            <Loader width="20px" height="20px"></Loader>
            {{ text }}
        </div>
        <div v-else>{{ text }}</div>
    </button>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            isLoading: false,
        };
    },
    props: {
        text: {
            type: String,
            default: 'Click Me',
        },
        config: {
            type: Object,
            default: {},
        },
    },
    methods: {
        async sendRequest() {
            this.isLoading = true;
            try {
                const response = await this.$api(this.config);
                this.$emit('response', response)
            } catch (error) {
                console.error('Error:', error);
                this.$store.dispatch('notify', {
                    ok: false,
                    message: error.response.data.message
                })
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>