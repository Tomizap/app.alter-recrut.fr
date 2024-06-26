<template>
    <div class="d-flex flex-column gap-2">
        <div class="d-flex align-items-center justify-content-between mb-2">
            <h5 class="m-0">Add new {{ collection }}</h5>
        </div>
        <div v-if="collection === 'recruiters'" class="d-flex flex-column gap-2">
            <Field :field="{ name: 'name', type: 'string', datalist: 'name-datalist' }" @change="ev => {
                item.name = ev.target.value;
            }">
            </Field>
            <Field :field="{ name: 'phone', type: 'phone' }" @change="ev => {
                item.phone = ev.target.value;
            }">
            </Field>
            <Field :field="{ name: 'email', type: 'email' }" @change="ev => { item.email = ev.target.value; }">
            </Field>

        </div>
        <div v-else-if="collection === 'jobs'" class="d-flex flex-column gap-2">
            <Field :field="{ name: 'name', type: 'string' }" @change="ev => { item.name = ev.target.value }">
            </Field>
            <h5>Criterias</h5>
            <Field :field="{ name: 'min-age', type: 'string' }"
                @change="ev => { item.criterias.ageMin = ev.target.value }">
            </Field>
            <Field :field="{ name: 'Max age', type: 'string' }"
                @change="ev => { item.criterias.ageMax = ev.target.value }">
            </Field>
            <Field :field="{ name: 'Gender', type: 'string' }"
                @change="ev => { item.criterias.gender = ev.target.value }">
            </Field>
            <Field :field="{ name: 'Driver License ?', type: 'boolean' }"
                @change="ev => { item.criterias.driverLicense = ev.target.value }">
            </Field>
            <Field :field="{ name: 'Online ?', type: 'boolean' }"
                @change="ev => { item.criterias.online = ev.target.value }">
            </Field>
            <h5>Comment</h5>
            <Field :field="{ name: 'Message', type: 'textarea' }"
                @change="ev => { item.criterias.ageMin = ev.target.value }">
            </Field>
        </div>
        <Submit :class="'w-100 mt-2 ' + (itemIsValid === true ? '' : 'disabled ')" text="Create" :config="{
            url: '/' + collection,
            method: 'POST',
            data: item
        }" @response="handleResponse"></Submit>
    </div>
</template>

<script>
export default {
    props: ['collection'],
    methods: {
        async handleResponse(data) {
            console.log(data);
            this.$router.push('/' + this.collection)
            // await reload(data.companies)
            this.$emit('response', data)
        }
    },
    computed: {
        itemIsValid() {
            if (this.collection === "recruiters") {
                return this.newItem.name !== '' && this.newItem.phone !== '' && this.newItem.email !== ''
            } else if (this.collection === "jobs") {
                return true
            }
            return true
        },
        item() {
            return this.$store.state.newItem.data
        }
    },
    data() {
        return {
            // newItem: {
            //     [this.collection]: [this.item._id],
            //     name: '',
            //     phone: '',
            //     email: '',
            //     location: {
            //         address: ''
            //     }
            // },
            // itemValid: false
        }
    },
}
</script>