<template>
    <div>
        <div class="d-flex flex-column gap-2">
            <div class="d-flex jus gap-2">
                <button class="btn border w-100 py-4 selected">Tous</button>
                <button class="btn border w-100 py-4">Prospects</button>
                <button class="btn border w-100 py-4">Partners</button>
            </div>
            <div>
                <table class="table table-striped table-hover">
                    <thead class="fw-bold" style="border: solid 1 black;">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">General infos</th>
                            <th scope="col">Contact</th>
                            <!-- <th scope="col">Recruiters</th>
                            <th scope="col">Jobs</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index) in companies" :key="index">
                            <td scope="row">
                                <Field :field="{ name: 'select_item', type: 'boolean' }">
                                </Field>
                            </td>
                            <td scope="row">
                                <div class="d-flex flex-column gap-2"></div>
                                <router-link class="icon" :to="'/recruiters/' + company._id">{{ company.name
                                    }}</router-link>
                                <div>{{ company.status }}</div>
                            </td>
                            <td>
                                <div>
                                    <div class="btn p-0 icon" data-bs-toggle="modal" data-bs-target="#sendEmailModal"
                                        @click="ev => {
                                            $store.state.modals.sendEmail = {
                                                to: company.email,
                                            }
                                        }">{{ company.email }}</div>
                                </div>
                                <div>
                                    <a :href="'tel:+33' + company.phone" target="_blank" rel="noopener noreferrer">{{
                                        company.phone }}</a>
                                </div>
                            </td>
                            <!-- <td>
                                <SubItemsList type="recruiters" :item="company"></SubItemsList>
                            </td>
                            <td>
                                <SubItemsList type="jobs" :item="company"></SubItemsList>
                            </td> -->
                            <td>
                                <button class="btn dropdown-toggle border" style="color:black; font-weight: 400;"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    plus
                                </button>
                                <ul class="dropdown-menu p-2">
                                    <li class="dropdown-item">Convert</li>
                                    <router-link class=" dropdown-item icon"
                                        :to="'/recruiters/' + company._id">Edit</router-link>
                                    <!-- <li class="dropdown-item"><router-link class="icon" :to="'/company/' + company._id">Edit</router-link></li> -->
                                    <hr class="dropdown-divider">
                                    <li class="dropdown-item">Add recruiter</li>
                                    <li class="dropdown-item">Add job</li>
                                    <hr class="dropdown-divider">
                                    <li class="dropdown-item" data-bs-toggle="modal" data-bs-target="#sendEmailModal"
                                        @click="ev => {
                                            $store.state.modals.sendEmail = {
                                                to: company.email,
                                            }
                                        }">Send Email</li>
                                    <hr class="dropdown-divider">
                                    <li class="dropdown-item">Delete</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newCoordonees: {},
        }
    },
    computed: {
        companies() {
            return this.$store.state.items.data
        }
    },
}
</script>