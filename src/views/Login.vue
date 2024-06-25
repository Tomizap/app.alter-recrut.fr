<template>
    <div>
        <div id="layoutAuthentication">
            <Header></Header>
            <div id="layoutAuthentication_content" class="d-flex">
                <main class="w-100 d-flex align-items-center">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow border-0 rounded-lg mt-5">
                                    <div class="card-body">
                                        <div class="d-flex flex-column gap-2">
                                            <Field :field="{ type: 'email' }" @on-change="value => { email = value }">
                                            </Field>
                                            <Field :field="{ type: 'password' }"
                                                @on-change="value => { password = value }">
                                            </Field>
                                            <Field :field="{ type: 'boolean', label: 'Remember Password' }"
                                                @on-change="value => { rememberPassword = value }"></Field>
                                            <div class="d-flex align-items-center justify-content-between mt-2 mb-0">
                                                <Submit text="Login"
                                                    :config="{ url: `/login`, data: { email, auth: { password } }, method: 'POST' }"
                                                    @response="handleLogin"></Submit>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            rememberPassword: false
        };
    },
    methods: {
        async handleLogin(response) {
            console.log(response);
            this.$store.dispatch('notify', { message: 'auth success !' })
            this.$store.state.user = response
            this.$cookies.set("token", response.auth.token);
            this.$router.push('/')
        },
    },
};
</script>