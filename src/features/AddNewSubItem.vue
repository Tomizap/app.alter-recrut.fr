<template>
    <div class="d-flex flex-column gap-2">
        <div class="d-flex align-items-center justify-content-between mb-2">
            <h5 class="m-0">Add new {{ collection }}</h5>
        </div>
        <div v-if="collection === 'recruiters'" class="d-flex flex-column gap-2">
            <Field :field="{ name: 'name', type: 'string', datalist: 'name-datalist' }" @change="ev => {
                newItem.name = ev.target.value;
            }">
            </Field>
            <Field :field="{ name: 'phone', type: 'phone' }" @change="ev => {
                newItem.phone = ev.target.value;
            }">
            </Field>
            <Field :field="{ name: 'email', type: 'email' }" @change="ev => { newItem.email = ev.target.value; }">
            </Field>

        </div>
        <div v-else-if="collection === 'jobs'">
            <Field :field="{ name: 'name', type: 'string' }" @change="ev => { newItem.name = ev.target.value }">
            </Field>
            <Field :field="{ name: 'phone', type: 'phone' }" @change="ev => { newItem.phone = ev.target.value }">
            </Field>
            <Field :field="{ name: 'email', type: 'email' }" @change="ev => { newItem.email = ev.target.value }">
            </Field>
        </div>
        <Submit :class="'w-100 mt-2 ' + (newItemIsValid === true ? '' : 'disabled ')" text="Create" :config="{
            url: '/' + $route.path.split('/')[1] + '/' + item._id + '/add/' + collection,
            method: 'PUT',
            data: newItem
        }" @response="handleResponse"></Submit>
    </div>
</template>

<script>
export default {
    props: ['item', 'collection'],
    methods: {
        async handleResponse(data) {
            console.log(data);
            this.$router.push('/' + this.$route.path.split('/')[1] + '/' + this.item._id + '/' + this.collection + '/' + data.subItem._id)
            // await reload(data.companies)
            this.$emit('reload', data)
        }
    },
    computed: {
        newItemIsValid() {
            return this.newItem.name !== '' && this.newItem.phone !== '' && this.newItem.email !== ''
        }
    },
    data() {
        return {
            newItem: {
                [this.collection]: [this.item._id],
                name: '',
                phone: '',
                email: '',
                location: {
                    address: ''
                }
            },
            itemValid: false
        }
    },
}
</script>