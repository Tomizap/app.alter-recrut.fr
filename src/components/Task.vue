<template>
    <div>
        {{ task.NAME }}
    </div>
</template>

<script>
export default {
    props: ['_id'],
    data() {
        return {
            tasks: {}
        }
    },
    methods: {
        async reload() {
            this.tasklist = await this.$store.state.api('/storages/tasks/' + this._id)
            // console.log(tasks);
            this.tasks = this.tasklist.tasks
        }
    },
    async mounted() {
        await this.reload()
    },
}
</script>