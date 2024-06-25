<template>
    <div class="d-flex gap-2">
        <a v-if="item.phone !== ''" target="_blank" rel="noopener noreferrer" :href="'tel:+33' + item.phone.slice(1)"
            class="px-1 py-0 border rounded btn icon">{{
                item.phone
            }}</a>
        <button type="button" class="btn icon py-0 px-1 border rounded" @click="(ev) => {
            $store.state.windows.add({
                name: 'Send new email',
                context: 'sendEmail',
                emailConfig: {
                    to: item.email,
                    subject: 'Recrutement Alternance', html: 'Bonjour,\n\n\n\nCordialement,'
                },
                // config: {url: ''},
                item
            })
        }">
            {{ item.email }}
        </button>
        <a v-if="item.links.website !== ''" :href="item.links.website" target="_blank" class="btn icon p-0"
            rel="noopener noreferrer"><i class="fa-solid fa-globe"></i></a>
        <button v-if="$route.params.id === item._id && fields.some(field => typeof item[field.name] === 'undefined')"
            class="dropdown-toggle py-0 px-1 bg-white border" style="color:black; font-weight: 400;"
            data-bs-toggle="dropdown" aria-expanded="false">
            add
        </button>
        <ul class="dropdown-menu p-2">
            <div class="d-flex flex-column gap-2">
                <h5 class="mb-2">Add coordonees</h5>
                <Field v-if="!item.phone || item.phone === ''" :field="{
                    name: 'Phone Number',
                    type: 'phone',
                }" @change="ev => { newCoordonees.phone = ev.target.value }"></Field>
                <Field v-if="!item.email || item.email === ''" :field="{
                    name: 'Email Address',
                    type: 'email',
                }" @change="ev => { newCoordonees.email = ev.target.value }"></Field>
                <Field v-if="!item.links.website || item.links.website === ''" :field="{
                    name: 'Website Link',
                    type: 'link',
                }" @change="ev => { newCoordonees['links.website'] = ev.target.value }"></Field>
                <Field v-if="!item.links.instagram || item.links.instagram === ''" :field="{
                    name: 'Instagram Link',
                    type: 'link',
                }" @change="ev => { newCoordonees['links.instagram'] = ev.target.value }"></Field>
                <Field v-if="!item.links.linkedin_page || item.links.linkedin_page === ''" :field="{
                    name: 'Linkedin Page Link',
                    type: 'link',
                }" @change="ev => { newCoordonees['links.linkedin_page'] = ev.target.value }"></Field>
                <Field v-if="!item.links.facebook_page || item.links.facebook_page === ''" :field="{
                    name: 'Facebook Page Link',
                    type: 'link',
                }" @change="ev => { newCoordonees['links.website'] = ev.target.value }"></Field>
                <Submit class="w-100 mt-2" text="Add" :config="{
                    url: '/' + $route.path.split('/')[1] + '/' + item._id,
                    data: newCoordonees,
                    method: 'PUT',
                }" @response="async function handleAddNewCoordonees(data) {
                    console.log(data);
                    await $store.state.item.reload()
                }"></Submit>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            newCoordonees: {},
            fields: [
                {
                    name: 'phone',
                    value: "",
                    type: "phone",
                    fieldSelector: "phone"
                },
                {
                    name: 'Email address',
                    value: "",
                    type: "email",
                    fieldSelector: "phone"
                },
                {
                    name: 'links.website',
                    value: "",
                    type: "links",
                    fieldSelector: "links.website"
                },
            ]
        }
    },
}
</script>