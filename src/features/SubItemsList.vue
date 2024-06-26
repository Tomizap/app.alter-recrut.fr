<template>
    <div>
        <Loader v-if="subItems === null"></Loader>
        <div v-else class="d-flex gap-2 flex-wrap">
            <div class="btn-group" v-for="(subItem, subItemIndex) in subItems">
                <router-link type="button" :class="'px-1 py-0 border rounded btn icon'"
                    :to="'/' + type + '/' + item._id" @click.right.prevent="ev => {
                        console.log('salut');
                    }">{{
                        subItem.name }}</router-link>
                <!-- <button type="button"
                    class="px-1 py-0 border rounded btn dropdown-toggle dropdown-toggle-split btn icon"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    <button class="dropdown-item" href="#" @click="async () => {
                        await $api.delete('/' + $route.path.split('/')[1] + '/' + item._id + '/remove/' + type + '/' + subItem._id)
                        if (subItem._id === $route.params.subitemid) {
                            $router.push('/' + $route.path.split('/')[1] + '/' + item._id)
                        }
                        await $store.state.subItems.reload(type)
                        // isLoading = false
                    }">delete</button>
                </ul> -->
            </div>

            <!-- <div class="dropdown">
                        <button class="dropdown-toggle py-0 px-1 bg-white border btn icon" style="font-weight: 400;"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            new
                        </button>
                        <ul class="dropdown-menu p-2" style="min-width: 250px;">
                            <AddNewSubItem :item="item" :collection="type" @reload="async function hundleAddNewSubItem(data) {
                                $store.state.subItems.reload(type)
                            }"></AddNewSubItem>
                        </ul>
                    </div> -->

        </div>
    </div>
</template>

<script>
export default {
    props: ['item', "type"],
    data() {
        return {
            subItems: null
        }
    },
    methods: {
        async reload() {
            this.subItems = null
            const subItems = []
            for (const subItemId of this.item[this.type]) {
                const subItem = await this.$api('/' + this.type + '/' + subItemId)
                subItems.push(subItem)
            }
            this.subItems = await subItems
            // console.log(this.subItems);
        }
    },
    mounted() {
        this.reload()
    },
}
</script>