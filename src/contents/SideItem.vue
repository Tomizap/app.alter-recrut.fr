<template>
    <div class="d-flex flex-column gap-2">
        <div class="p-2 border rounded">
            <div v-if="$store.state.items.view === 'fields'" class="d-flex flex-column gap-2">
                <!-- {{ item }} -->
                <Field :field="{
                    name: 'name',
                    type: 'string',
                    value: item.name
                }" @change="ev => { $store.state.item.update({ name: ev.target.value }) }"></Field>
                <Field :field="{
                    name: 'sector',
                    type: 'string',
                    value: item.sector
                }" @change="ev => { $store.state.item.update({ sector: ev.target.value }) }"></Field>
                <Field :field="{
                    name: 'description',
                    type: 'textarea',
                    value: item.description
                }" @change="ev => { $store.state.item.update({ description: ev.target.value }) }"></Field>
            </div>
            <div v-else-if="$store.state.items.view === 'actions'" class="d-flex flex-column gap-2">
                <h5 class="m-0">Acquisition</h5>
                <div v-if="item.email === ''">Please add an email address</div>
                <div v-else class="d-flex flex-column gap-2">
                    <Submit :text="'Informationnal Email 1'" :config="{
                        method: 'POST',
                        url: '/companies/' + item._id + '/email/send',
                        data: {
                            subject: `Service d'accompagnement gratuit pour recrutement en alternance`,
                            html: informationalEmail1
                        }
                    }" @response="(data) => { $store.dispatch('notify', data) }"></Submit>
                </div>
            </div>
            <div v-else-if="$store.state.items.view === 'contacts'" class="d-flex flex-column gap-2">
                <h5 class="m-0">Contacts</h5>
                <Field :field="{
                    type: 'email',
                    value: item.email
                }" @change="ev => { $store.state.item.update({ email: ev.target.value }).then(() => { reload() }) }">
                </Field>
                <Field :field="{
                    type: 'phone',
                    value: item.phone
                }" @change="ev => { $store.state.item.update({ phone: ev.target.value }).then(() => { reload() }) }">
                </Field>
                <h5 class="m-0">Recruiters</h5>

            </div>
            <div v-else-if="$store.state.items.view === 'location'" class="d-flex flex-column gap-2">
                <Field :field="{
                    name: 'New address',
                    type: 'location',
                    value: item.location.address
                }" @change="async function handleLocation(ev) {
                    console.log(ev.target.value);
                    const addresses = await $axios(`https://api-adresse.data.gouv.fr/search/?q=${ev.target.value}`)
                        .then((data) => data.data.features || []).catch(err => []);
                    console.log(addresses);

                    var updator
                    if (addresses.length === 0) {
                        const postcode = /^\d{10}$/.exec(ev.target.value)
                        console.log(postcode);

                        updator = {
                            'location.address': ev.target.value,
                            'location.postcode': '',
                            'location.street': '',
                            'location.city': '',
                            'location.country': '',
                            'location.county': ''
                        }
                    } else {
                        updator = {
                            'location.address': addresses[0].label,
                            'location.postcode': addresses[0].postcode,
                            'location.street': addresses[0].street,
                            'location.city': addresses[0].city,
                            'location.country': 'fr',
                            'location.county': addresses[0].postcode[0] + addresses[0].postcode[1]
                        }
                    }
                    console.log(updator);
                    // await $store.state.item.update(updator)
                }"></Field>
                <div class="d-flex gap-2">
                    <Field :field="{
                        name: 'city',
                        type: 'string',
                        value: item.location.city,
                        disabled: true
                    }"></Field>
                    <Field class="col-4" :field="{
                        name: 'county',
                        type: 'string',
                        value: item.location.county,
                        disabled: true
                    }"></Field>
                </div>
                <Field class="col" :field="{
                    name: 'address',
                    type: 'string',
                    value: item.location.address,
                    disabled: true
                }"></Field>
                <!-- <GMapMap :center="{ lat: 48.8, lng: 2.3 }" :zoom="9.7" style="width: 100%; height: 300px">
                    <GMapMarker :position="{ lat: 10, lng: 10 }" :clickable="true" :draggable="true" />
                </GMapMap> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        item() {
            return this.$store.state.sideItem.data
        },
    },
    data() {
        return {
            informationalEmail1: `
                Bonjour,
                <br><br>
                Je m'appelle ${this.$store.state.user.name} et je représente un cabinet de recrutement spécialisé dans l'alernance.
                <br><br>
                Notre mission est de faciliter gratuitement l'intégration de talents qualifiés au sein d'entreprises en voie de développement.
                <br><br>
                Notre collaboration avec divers établissements d'enseignement nous permet de vous présenter un éventail de profils méticuleusement sélectionnés, proches de chez vous et en adéquation avec vos critères de sélection spécifiques et les exigences de votre secteur d'activité.
                <br><br>
                <a style="padding: 10px 15px; background: #FFD100; border-radius: 15px; text-decoration: none; color:black" href="https://calendar.app.google/RKzMuANnhgCag4j88">Prendre rendez-vous avec un chargé de recrutement</a>
                <br><br>
                J'attends avec impatience notre rencontre !
                <br><br>
                Cordialement,
                <br><br>
            `
        }
    }
}
</script>