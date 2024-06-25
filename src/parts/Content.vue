<template>
    <main class="px-4 row">
        <!-- header -->
        <div class="d-flex justify-content-between align-items-center gap-2 my-4">
            <div>
                <h1 class="mb-1">{{ $route.path.split('/')[1] }}</h1>
            </div>
            <div class="d-flex gap-2">
                <button :class="'btn icon ' + ($store.state.items.showFilters ? 'selected' : '')" @click="ev => {
                    if ($store.state.items.showFilters === true) {
                        $store.state.items.showFilters = false
                    } else {
                        $store.state.items.showFilters = true
                    }
                }"><i class="fa-solid fa-filter"></i></button>
                <button class="btn icon" @click="$store.state.items.reload()"><i
                        class="fa-solid fa-rotate-right"></i></button>
                <button class="btn border ms-2 icon fw-bold" @click="ev => {
                    $store.state.windows.add({
                        name: 'Add new item',
                        context: 'newItem',
                        position: 'sidebar',
                        config: { url: '/' + $route.path.split('/')[1] },
                        item: {}
                    })
                }">New</button>
            </div>
        </div>
        <!-- router view -->
        <router-view class="col" style="position: sticky; top: 72px;"></router-view>
        <!-- Windows -->
        <div v-if="$store.state.windows.list.length > 0" class="col-3">
            <div style="position: sticky; top: 72px;">
                <div v-for="(window, index) in $store.state.windows.list" :key="index">
                    <Window v-if="window.position === 'sidebar'" :window="window" :title="window.name"> </Window>
                </div>
            </div>
        </div>
        <!-- Datalists -->
        <datalist :id="'phone-datalist'">
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
        </datalist>
    </main>
</template>

<script>
export default {
    methods: {
        // items
        async reload() {
            console.log('reloadItems()');
            this.$store.state.loader.data = true
            if (!this.$route.params.collection) return this.$router.push("/")
            try {
                this.$store.state.items.data = await this.$api.get(this.$route.params.collection, { params: this.$store.state.items.selector })
                this.$store.state.loader.data = false
                this.reloadCollection()
                if (this.$route.params.id) this.reloadItem({ reloadSubItems: true })
                if (this.$route.params.subitemid) {
                    await this.reloadSideItem(this.$route.path.split('/')[3], this.$route.params.subitemid)
                } else {
                    await this.reloadSideItem()
                }
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
        async reloadItem(config = {}) {
            console.log('reloadItem()');
            if (!this.$route.params.id) return
            this.$store.state.item.data = null
            try {
                if (this.$route.params.id) {
                    this.$store.state.item.data = await this.$api(this.$route.params.collection + '/' + this.$route.params.id)
                } else {
                    this.$router.push('/' + this.$route.params.collection)
                }
            } catch (error) {
                this.$router.push('/' + this.$route.params.collection)
            }
            if (config.reloadSubItems === true) await this.reloadSubItems()
        },
        // sideitem
        async reloadSideItem(type = this.$route.params.collection, id = this.$route.params.id) {
            console.log('reloadSideItem()');
            if (!type || !id) return
            this.$store.state.sideItem.data = null
            try {
                this.$store.state.sideItem.data = await this.$api('/' + type + '/' + id)
            } catch (error) {
                this.$router.push('/' + this.$route.params.collection)
            }
        },
        // subItems
        async reloadSubItems(type, id = this.$route.params.id) {
            console.log('reloadSubItems()');
            if (!id) return
            this.$store.state.subItems.data[type] = null
            if (!type || type === 'all') {
                ['recruiters', "jobs"].forEach(async type => {
                    this.$store.state.subItems.data[type] =
                        await this.$api('/' + this.$route.params.collection + "/" + id + '/extend/' + type)
                })
            } else {
                this.$store.state.subItems.data[type] = null
                this.$store.state.subItems.data[type] =
                    await this.$api('/' + this.$route.params.collection + "/" + id + '/extend/' + type)
            }
        },
    },
    watch: {
        async $route(newRoute, oldRoute) {
            console.log(newRoute);
            if (newRoute.params.subitemid !== oldRoute.params.subitemid) {
                await this.reloadSideItem(this.$route.path.split('/')[3], newRoute.params.subitemid)
                if (newRoute.params.id !== oldRoute.params.id) await this.reloadItem({ reloadSubItems: true })
            } else if (newRoute.params.id !== oldRoute.params.id) {
                await this.reloadItem({ reloadSubItems: true })
                await this.reloadSideItem()
            }
        }
    },
    computed: {
        recruiters() {
            return this.$store.state.collections.recruiters.items
        },
        companies() {
            return this.$store.state.collections.companies.items
        },
    },
    async mounted() {
        this.reload()

        this.$store.state.item.reload = this.reloadItem
        this.$store.state.items.reload = this.reload
        this.$store.state.subItems.reload = this.reloadSubItems
        this.$store.state.sideItem.reload = this.reloadSubItems
    }
}
</script>
