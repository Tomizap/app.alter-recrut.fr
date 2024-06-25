<template>
    <Loader v-if="isLoading === true"></Loader>
    <div v-else class="d-flex flex-column gap-2">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center">
            <router-link :to="'/' + $route.path.split('/')[1] + '/' + company._id"
                :class="'btn icon p-0 fs-3 ' + ($route.params.id === company._id ? 'fw-bold selected' : '')"
                style="text-align: left;">
                {{ company.name }}
            </router-link>
            <div>
                <Submit text="Convert" :config="{
                    url: $route.path + '/convert',
                }" @mouseenter="showConvertToolTips = true" @mouseleave="showConvertToolTips = false" @response="">
                </Submit>
                <div :id="'hjpaohbxbwpdiehxb_' + id"
                    :class="'bg-white border rounded p-2 mt-2 collapse ' + (showConvertToolTips ? 'show' : '')"
                    style="position: absolute; z-index: 999;">
                    <!-- email address -->
                    <div v-if="company.email !== ''" class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-check" style="color: green;"></i>
                        <div>Email Address ok</div>
                    </div>
                    <div v-else class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-xmark" style="color: red;"></i>
                        <div>Missing Email Address</div>
                    </div>
                    <!-- phone number -->
                    <div v-if="company.phone !== ''" class="d-flex align-items-center gap-2">
                        <i class="fa-regular
                         fa-circle-check" style="color: green;"></i>
                        <div>Phone ok</div>
                    </div>
                    <div v-else class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-xmark" style="color: red;"></i>
                        <div>Missing phone</div>
                    </div>
                    <!-- location number -->
                    <div v-if="company.location !== ''" class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-check" style="color: green;"></i>
                        <div>Location ok</div>
                    </div>
                    <div v-else class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-xmark" style="color: red;"></i>
                        <div>Missing location</div>
                    </div>
                    <!-- jobs -->
                    <div v-if="company.jobs.length > 0" class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-check" style="color: green;"></i>
                        <div>Jobs ok</div>
                    </div>
                    <div v-else class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-xmark" style="color: red;"></i>
                        <div>Missing 1 job at least</div>
                    </div>
                    <!-- recruiters -->
                    <div v-if="company.recruiters.length > 0" class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-check" style="color: green;"></i>
                        <div>Recruiters ok</div>
                    </div>
                    <div v-else class="d-flex align-items-center gap-2">
                        <i class="fa-regular fa-circle-xmark" style="color: red;"></i>
                        <div>Missing 1 Recruiter at least</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Filters -->
        <div class="d-flex gap-2 ">
            <div :class="'px-2 py-0 text-bg-dark rounded ' + (() => {
                if (company.status === 'disqualified') {
                    return 'bg-danger text-bg-dark'
                } else if (company.status === 'lead') {
                    return 'bg-warning'
                }
            })()">{{ company.status }}</div>
            <div class="btn icon px-1 py-0" :name="company.sector" @click="(ev) => {
                $store.state.items.selector.sector = ev.target.attributes.name.value
                $store.state.items.reload()
            }">{{ company.sector }}</div>
        </div>
        <!-- SubItems Lists -->
        <div v-if="item._id === $route.params.id" class="d-flex flex-column gap-2">
            <SubItemsList type="recruiters" :item="item"></SubItemsList>
            <SubItemsList type="jobs" :item="item"></SubItemsList>
        </div>
        <!-- Contacts -->
        <Box title="Contacts">
            <template #content>
                <div class="d-flex flex-column gap-2 align-items-start">
                    <div class="btn icon px-1 py-0" @click="ev => {
                    }">{{ company.location.address }}</div>
                    <Coordonees :item="item"></Coordonees>
                </div>
            </template>
        </Box>
    </div>
</template>

<script>
import AddNewSubItem from '../features/AddNewSubItem.vue';
import SubItemsList from '../features/SubItemsList.vue';
import Coordonees from '../features/Coordonees.vue';
export default {
    components: {
        AddNewSubItem,
        Coordonees,
        SubItemsList
    },
    props: ['item', "index"],
    data() {
        return {
            id: this.item._id,
            isLoading: false,
            company: this.item || null,
            //recruiters
            newRecruiter: {
                companies: [this.item._id],
            },
            // jobs
            newJob: {
                companies: [this.item._id],
                location: this.item.location.address
            },
            // temp
            showConvertToolTips: false
        }
    },
    computed: {
        canBeConverted() {
            if (this.company.status === 'lead') {
                return [
                    this.company.phone !== "",
                    this.company.email !== "",
                    this.company.jobs.length > 0,
                    this.company.recruiters.length > 0,
                ].every(c => c === true)
            } else if (this.company.status === 'prospect') {

            }
            return false
        },
        pipeline() {
            return this.$store.state.pipelines.find(p => p.collection === 'companies')
        }
    },
    methods: {
        async convert() {
            if (!this.canBeConverted) { return }
        }
    },
    // async mounted() {
    //     if (this.$routes)
    //     this.$store.state.subItems.reload('all', this.item._id)
    // }
}
</script>