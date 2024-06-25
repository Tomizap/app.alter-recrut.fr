<template>
    <div>
        <div class="border rounded mb-4 p-2 d-flex gap-2">
            <Field name="status" class="col" :field="{
                name: 'status',
                type: 'select',
                value: $store.state.items.selector.status,
                options: [
                    { value: 'disqualified' },
                    { value: 'lead' },
                    { value: 'prospect' },
                    { value: 'partner' },
                ]
            }" @change="ev => { $store.state.items.selector.status = ev.target.value; reload() }"></Field>
            <Field name="county" class="col" :field="{
                name: 'county',
                type: 'select',
                value: $store.state.items.selector['location.county'],
                options: [
                    { value: 'all' },
                    { value: '75' },
                    { value: '77' },
                    { value: '78' },
                    { value: '92' },
                    { value: '93' },
                    { value: '94' },
                    { value: '95' },
                ]
            }" @change="ev => {
                if (ev.target.value === 'all') {
                    delete $store.state.items.selector['location.county'];
                } else {
                    $store.state.items.selector['location.county'] = ev.target.value;
                }
                reload()
            }"></Field>
            <Field name="sector" class="col" :field="{
                name: 'sector',
                type: 'string',
                value: $store.state.items.selector.sector,
                options: []
            }" @change="ev => { $store.state.items.selector.sector = ev.target.value; reload() }"></Field>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // status: this.$store.state.items.selector.status,
            // county: this.$store.state.items.selector['location.county'],
            // sector: this.$store.state.items.selector.sector,
        }
    },
    methods: {
        reload() {
            this.$store.state.items.reload()
        }
    }
}
</script>