<template>
    <div>
        <Box :title="title">
            <template #content>
                <div class="d-flex flex-column gap-2">
                    <!-- Close button -->
                    <button type="button" class="btn-close bg-white border rounded p-2 icon" aria-label="Close"
                        style="position: absolute; top: -15px; right: -10px; width: 10px; height: 10px;"
                        @click="ev => { $store.state.windows.delete(window.id) }"></button>
                    <!-- sendEmail -->
                    <div v-if="window.context === 'sendEmail'" class="d-flex flex-column gap-2">
                        <Field :field="{
                            name: 'from',
                            type: 'string',
                            value: $store.state.user.email,
                            disabled: true
                        }" @change="(ev) => { emailConfig.to = ev.target.value }"></Field>
                        <Field :field="{
                            name: 'to',
                            type: 'string',
                            value: emailConfig.to || ''
                        }" @change="(ev) => { emailConfig.to = ev.target.value }"></Field>
                        <Field :field="{
                            name: 'subject',
                            type: 'string',
                            value: emailConfig.subject || ''
                        }" @change="(ev) => { emailConfig.subject = ev.target.value }"></Field>
                        <Field :field="{
                            name: 'message',
                            type: 'textarea',
                            value: emailConfig.html || '',
                        }" @change="(ev) => { emailConfig.html = ev.target.value }"></Field>
                    </div>
                    <!-- newItem -->
                    <div v-else-if="window.context === 'newItem'" class="d-flex flex-column gap-2">
                        <Field :field="{
                            name: 'name',
                            type: 'string',
                            value: item.name || ''
                        }" @change="(ev) => { item.name = ev.target.value }"></Field>
                        <Field :field="{
                            name: 'phone',
                            type: 'phone',
                            value: item.phone || ''
                        }" @change="(ev) => { item.phone = ev.target.value }"></Field>
                        <Field :field="{
                            name: 'email',
                            type: 'email',
                            value: item.email || ''
                        }" @change="(ev) => { item.email = ev.target.value }"></Field>
                    </div>
                    <!-- template slot -->
                    <slot name="content"></slot>
                    <!-- Submit button -->
                    <Submit :text="submitText" :config="submitConfig" @response="r => {
                        $store.dispatch('notify', r)
                        $store.state.windows.delete(window.id)
                    }"></Submit>
                </div>
            </template>
        </Box>
    </div>
</template>

<script>
export default {
    props: ['title', 'window'],
    data() {
        return {
            item: this.window.item,
            config: this.window.config,
            emailConfig: this.window.emailConfig,
        }
    },
    computed: {
        submitText() {
            if (this.window.context === "newItem") return "New"
            if (this.window.context === "sendEmail") return "Send"
            return 'Submit'
        },
        submitConfig() {
            const config = this.window.config || {}
            if (this.window.context === "newItem") {
                config.method = 'POST'
                config.data = this.item
                config.url = this.item.collection
            } else if (this.window.context === "sendEmail") {
                config.method = 'POST'
                config.data = this.emailConfig
                if (this.item) {
                    config.url = ''
                } else {
                    config.url = '/google/gmail/send'
                }
            }
            return config
        }
    },
    // methods: {
    //     async handleSubmit() {
    //         var response = null
    //         if (this.window.config) {

    //         } else if (!item) {
    //             response = await this.$api.post('/google/gmail/send', this.emailConfig)
    //         } else {
    //             response = await this.$api.post(`/${this.window.type}/`, this.emailConfig)
    //         }
    //         if (response !== null) $store.dispatch('notify', r)
    //         this.$store.state.windows.delete(this.window.id)
    //     }
    // }
}
</script>