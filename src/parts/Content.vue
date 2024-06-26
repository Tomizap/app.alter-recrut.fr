<template>
    <main class="px-4 row">
        <!-- header -->
        <div class="d-flex justify-content-between align-items-center gap-2 my-4">
            <div>
                <h1 class="mb-1">{{ $route.name }}</h1>
            </div>
            <div class="d-flex gap-2">
                <!-- <button :class="'btn icon ' + ($store.state.items.showFilters ? 'selected' : '')" @click="ev => {
                    if ($store.state.items.showFilters === true) {
                        $store.state.items.showFilters = false
                    } else {
                        $store.state.items.showFilters = true
                    }
                }"><i class="fa-solid fa-filter"></i></button> -->
                <button class="btn icon" @click="$store.state.items.reload()"><i
                        class="fa-solid fa-rotate-right"></i></button>
                <button class="btn border ms-2 icon fw-bold" data-bs-toggle="modal" data-bs-target="#newItemModal"
                    @click="ev => {
                        $store.state.newItem.push({
                            name: 'Add new item',
                            context: 'newItem',
                            position: 'sidebar',
                            config: { url: '/' + $route.path.split('/')[1] },
                            item: {}
                        })
                    }">New</button>
                <button class="btn border ms-2 icon fw-bold">Import</button>
                <button class="btn border ms-2 icon fw-bold">Export</button>
            </div>
        </div>
        <!-- router view -->
        <Loader v-if="$store.state.items.data === null">

        </Loader>
        <router-view v-else class="col" style="position: sticky; top: 72px;"></router-view>
        <!-- Windows -->
        <!-- <div v-if="$store.state.windows.list.length > 0" class="col-3">
            <div style="position: sticky; top: 72px;">
                <div v-for="(window, index) in $store.state.windows.list" :key="index">
                    <Window v-if="window.position === 'sidebar'" :window="window" :title="window.name"> </Window>
                </div>
            </div>
        </div> -->
        <!-- Datalists -->
        <!-- <datalist :id="'phone-datalist'">
            <option v-for="(recruiter, index) in recruiters" :key="index" :value="recruiter.phone">{{ recruiter.name }}
                | {{ recruiter.email }}
            </option>
            <option v-for="(company, index) in companies" :key="index" :value="company.phone">{{ company.name }} | {{
                company.email }}</option>
        </datalist>
        <datalist :id="'email-datalist'">
            <option v-for="(recruiter, index) in recruiters" :key="index" :value="recruiter.email">{{ recruiter.name }}
                | {{
                    recruiter.phone }}
            </option>
            <option v-for="(company, index) in companies" :key="index" :value="company.email">{{ company.name }} | {{
                company.phone }}</option>
        </datalist>
        <datalist :id="'name-datalist'">
            <option v-for="(recruiter, index) in recruiters" :key="index" :value="recruiter.name">{{ recruiter.email }}
                | {{
                    recruiter.phone }}
            </option>
            <option v-for="(company, index) in companies" :key="index" :value="company.name">{{ company.email }} | {{
                company.phone }}</option>
        </datalist> -->
    </main>
</template>

<script>
export default {
    methods: {
        // items
        async reload(config) {
            console.log('reloadItems()');
            try {
                this.$store.state.items.data = null
                this.$store.state.items.data = await this.$api.get(config || this.$route.meta.config)
                this.reloadCollection()
            } catch (error) {
                this.$router.push("/")
            }
        },
        // collection
        async reloadCollection() {
            console.log('reloadCollection()');
            for (const collectionName in this.$store.state.collections) {
                const collection = this.$store.state.collections[collectionName]
                const items = await this.$api(collection.config)
                this.$store.state.collections[collectionName].items = items
            }
        },
        // item
        // async reloadItem(config = {}) {
        //     console.log('reloadItem()');
        //     if (!this.$route.params.id) return
        //     this.$store.state.item.data = null
        //     try {
        //         if (this.$route.params.id) {
        //             this.$store.state.item.data = await this.$api(this.$route.params.collection + '/' + this.$route.params.id)
        //         } else {
        //             this.$router.push('/' + this.$route.params.collection)
        //         }
        //     } catch (error) {
        //         this.$router.push('/' + this.$route.params.collection)
        //     }
        //     if (config.reloadSubItems === true) await this.reloadSubItems()
        // },
    },
    watch: {
        async $route(newRoute, oldRoute) {
            this.reload(newRoute.meta.config)
        }
    },
    async mounted() {
        this.reload()
        this.$store.state.items.reload = this.reload
    }
}
</script>
