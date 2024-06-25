<template>
    <div class="d-flex flex-column gap-1">
        <div v-for="(field, index) in fields" :key="index">
            <div v-if="this.fields.some(f => f.name === field.name)" class="d-flex align-items-center gap-2">
                <!-- <a
                class="btn"
                :href="'https://tel:' + contact[field.name]"
                target="_blank"
                rel="noopener noreferrer"
                >
                <i :class="if (field.name === 'PHONE') {return 'fa-solid fa-user'}"></i>
                </a> -->
                <input 
                    :name="field.name"
                    list="contacts_datalist"
                    type="text" 
                    :disabled="field.disabled === true"
                    @input="(ev) => {
                        if (field.validator && field.validator.test(ev.target.value)) {
                            ev.target.classList.remove('alert')
                        } else {
                            ev.target.classList.add('alert')
                            return
                        }
                        updateContact({$set: {[ev.target.name]: ev.target.value}})
                    }"
                    :value="contact[field.name]" 
                    class="border-0 form-control" 
                />
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    props: ['contact', 'fields'],
    updator: {},
    methods: {
        async updateContact(updator={}) {
            // console.log('updator', updator);
            const updating = await this.$store.state.api.post('/', {
                db: "contacts",
                collection: "companies",
                action: 'edit',
                selector: {_id: this.contact._id},
                updator
            })
            // console.log(updating);
            for (const f in this.updator) this.updator[f] = ''
        },
    }
}
</script>