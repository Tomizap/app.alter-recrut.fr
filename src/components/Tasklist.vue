<template>
    <div v-if="tasklist !== null">
        <h2 class="h3">{{ tasklist.NAME || '' }}</h2>
        <Task v-for="(task, index) in tasks" :key="index" :task="task"></Task>
        <Submit text="Add new task" :config="{
            method: 'POST',
            url: '/crud/storages/tasks'
        }" @response="(data) => { console.log(data); $store.state.reload() }"></Submit>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            tasklist: this.item || null,
            tasks: []
        }
    },
    methods: {
        async reload() {
            if (this.tasklist == null) {
            } else {
                console.log('reload');
                this.tasklist = await this.$store.state.api('/crud/storages/tasklists/' + this.tasklist._id)
                this.tasklist = await this.tasklist.data || null
                console.log(this.tasklist);
                // this.tasks = this.tasklist.tasks
            }
        },
        editTasklist() {

        },
        deleteTasklist() {

        },
        addTask() {

        },
        editTask() {

        },
        deleteTask() {

        }
    },
    async mounted() {
        console.log('mounted', this.tasklist);
        await this.reload()
    },
}
</script>