<template>
    <div>
        <FilterListItems v-if="$store.state.items.showFilters"></FilterListItems>
        <div class="row h-100">
            <div class="col" v-if="$store.state.loader.data === true">
                <Loader></Loader>
            </div>
            <div v-else class="col">
                <div>
                    <div v-if="$store.state.items.data.length > 0" v-for="(item, index) in $store.state.items.data"
                        :key="index"
                        :class="'border rounded p-2 mb-2 d-flex flex-column gap-1 ' + ($route.params.id === item._id ? 'border-primary border-2' : '')">
                        <div v-if="item._id === $route.params.id">
                            <Loader v-if="$store.state.item.data === null"></Loader>
                            <ItemListItems v-else :item="$store.state.item.data" :index="index"></ItemListItems>
                        </div>
                        <div v-else>
                            <ItemListItems :item="item" :index="index"></ItemListItems>
                        </div>
                    </div>
                    <div v-else>0 items founded</div>
                </div>
            </div>
            <div class="col-4" v-if="$route.params.id">
                <div class="d-flex flex-column gap-2">
                    <div class="d-flex gap-2 justify-content-end">
                        <button type="button"
                            :class="'btn icon ' + ($store.state.items.view === 'timeline' ? 'selected' : '')"
                            @click="(ev) => { $store.state.items.view = 'timeline' }">
                            <i class="fa-solid fa-timeline"></i>
                        </button>
                        <button type="button"
                            :class="'btn icon ' + ($store.state.items.view === 'location' ? 'selected' : '')"
                            @click="(ev) => { $store.state.items.view = 'location' }">
                            <i class="fa-solid fa-location-dot"></i>
                        </button>
                        <button type="button"
                            :class="'btn icon ' + ($store.state.items.view === 'contacts' ? 'selected' : '')"
                            @click="(ev) => { $store.state.items.view = 'contacts' }">
                            <i class="fa-regular fa-address-book"></i>
                        </button>
                        <button type="button"
                            :class="'btn icon ' + ($store.state.items.view === 'actions' ? 'selected' : '')"
                            @click="(ev) => { $store.state.items.view = 'actions' }">
                            <i class="fa-solid fa-envelope"></i>
                        </button>
                        <button type="button"
                            :class="'btn icon ' + ($store.state.items.view === 'fields' ? 'selected' : '')"
                            @click="(ev) => { $store.state.items.view = 'fields' }">
                            <i class="fa-solid fa-list"></i>
                        </button>
                    </div>
                    <Loader v-if="$store.state.sideItem.data === null"></Loader>
                    <router-view v-else style="position: sticky; top: 70px;"></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FilterListItems from "./FilterListItems.vue";
import ItemListItems from "./ItemListItems.vue";
import SideItem from "./SideItem.vue";
export default {
    // props: ['items'],
    data() {
        return {
        }
    },
    components: {
        FilterListItems,
        ItemListItems
    }
}
</script>