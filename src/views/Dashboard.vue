<template>
    <div v-if="$store.state.user !== null">
        <Header></Header>
        <div id="layoutSidenav"
            style="position: absolute; top: 0; left: 0; width: 100%; overflow-y: scroll; overflow-x: hidden;">
            <Sidebar></Sidebar>
            <div id="layoutSidenav_content" style="max-height: 100vh;">
                <PageLoader v-if="$store.state.loader.page === true"></PageLoader>
                <Content v-else></Content>
                <Footer></Footer>
            </div>
        </div>
        <!-- Global modal -->
        <div class="modal fade" id="sendEmailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="sendEmailModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="sendEmailModalLabel">Send an email</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column gap-2">
                            <Field :field="{
                                disabled: true,
                                name: 'from',
                                type: 'string',
                                value: $store.state.user.email
                            }"></Field>
                            <Field :field="{
                                name: 'to',
                                type: 'string',
                                value: $store.state.modals.sendEmail.to
                            }" @change="(ev) => { $store.state.modals.to = ev.target.value }"></Field>
                            <Field :field="{
                                name: 'subject',
                                type: 'string',
                                value: $store.state.modals.sendEmail.subject
                            }" @change="(ev) => { $store.state.modals.subject = ev.target.value }"></Field>
                            <Field :field="{
                                name: 'html',
                                type: 'textarea',
                                value: $store.state.modals.sendEmail.html
                            }" @change="(ev) => { $store.state.modals.html = ev.target.value }"></Field>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn icon" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="(ev) => {
                            $api.post('/google/gmail/send', $store.state.modals.sendEmail).then(r => {
                                $store.dispatch('notify', r)
                            });
                        }">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <PageLoader v-else></PageLoader>
</template>

<script>
export default {
    async beforeCreate() {
        this.$store.state.loader.page = true
        var token
        if (this.$store.state.user === null) {
            token = this.$cookies.get("token");
            if (!token) {
                console.log("missing auth cookies");
                await this.$store.dispatch("logout");
            }
        } else {
            token = this.$store.state.user.auth.token
        }
        this.$store.dispatch('notify', { message: 'Connecté !', ok: true })
        const user = await this.$api('/me?token=' + token)
        console.log(user);
        this.$store.state.user = user
        this.$api.defaults.headers.common['token'] = user.auth.token
        this.$store.state.loader.page = false
    },
};
</script>
