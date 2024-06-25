<template>
    <div>
        <div v-if="field.type === 'string'">
            <div class="form-floating">
                <input type="text" :class="'form-control ' + (isInvalid === true ? 'is-invalid' : '')"
                    :disabled="field.disabled" :value="field.value" :id="fieldId" placeholder=""
                    @input="(ev) => change(ev.target)" :list="field.datalist">
                <label :for="fieldId">{{ field.name }}</label>
            </div>
        </div>
        <div v-else-if="field.type === 'location'">
            <div class="form-floating">
                <input type="text" :class="'form-control ' + (isInvalid === true ? 'is-invalid' : '')"
                    :disabled="field.disabled" :id="fieldId" @input="(ev) => { suggestLocation(ev.target.value) }"
                    list="address-suggestions">
                <label :for="fieldId">{{ field.name }}</label>
            </div>
            <datalist id="address-suggestions">
                <option v-for="suggestion in locationSuggestions" :key="suggestion.properties.id"
                    :value="suggestion.properties.label">
                    {{ suggestion.properties.label }}
                </option>
            </datalist>
        </div>
        <div v-else-if="field.type === 'textarea'">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" :id="'subItemJobCriteria'"
                    :style="{ height: (field.height || '200') + 'px' }">{{ field.value || "" }}</textarea>
                <label :for="'subItemJobCriteria'">{{ field.name }}</label>
            </div>
        </div>
        <div v-else-if="field.type === 'phone'">
            <div :class="'input-group'">
                <span class="input-group-text" id="basic-addon-phone">+33</span>
                <input type="email" :class="'form-control '" placeholder="Phone number" aria-label="Phone number"
                    :placeholder="field.placeholder || '0756987385'" :value="field.value || ''"
                    aria-describedby="basic-addon1" @input="(ev) => change(ev.target)"
                    :list="field.datalist || 'phone-datalist'">
            </div>
        </div>
        <div v-else-if="field.type === 'link'">
            <div :class="'input-group'">
                <span class="input-group-text" id="basic-addon-link">https://</span>
                <input type="email" :class="'form-control '" :placeholder="field.placeholder || field.name || 'Link'"
                    :value="field.value || ''" @input="(ev) => change('https://' + ev.target)"
                    :list="field.datalist || 'links-datalist'">
            </div>
        </div>
        <div v-else-if="field.type === 'email'">
            <div class="form-floating">
                <input :class="'form-control '" :id="fieldId" type="email" :value="field.value || ''"
                    :placeholder="field.placeholder || 'exemple@mail.com'" @input="(ev) => change(ev.target)"
                    :list="field.datalist || 'email-datalist'" />
                <label :for="fieldId">
                    {{ field.name || 'Email' }}
                </label>
            </div>
        </div>
        <div v-else-if="field.type === 'password'">
            <div class="form-floating">
                <input class="form-control" :id="fieldId" type="password" placeholder="" :value="field.value || ''"
                    @input="(ev) => change(ev.target)" />
                <label :for="fieldId">
                    {{ field.name || field.label || 'Password' }}
                </label>
            </div>
        </div>
        <div v-else-if="field.type === 'description'"></div>
        <div v-else-if="field.type === 'boolean'">
            <div class="form-check">
                <input checked class="form-check-input" :id="fieldId" type="checkbox" value=""
                    @input="(ev) => change(ev.target)" />
                <label class="form-check-label" style="background: transparent;" :for="fieldId">{{
                    field.label || '' }}</label>
            </div>
        </div>
        <div v-else-if="field.type === 'number'"></div>
        <div v-else-if="field.type === 'file'"></div>
        <div v-else-if="field.type === 'select'">
            <div class="form-floating">
                <select class="form-select" :id="fieldId" aria-label="Floating label select example"
                    :value="field.value" @input="(ev) => change(ev.target)">
                    <!-- <option selected>Open this select menu</option> -->
                    <option v-for="(option, index) in field.options || []" :key="index" :value="option.value">{{
                        option.text || option.value }}</option>
                </select>
                <label :for="fieldId">{{ field.name }}</label>
            </div>
        </div>
        <div v-else-if="field.type === 'date'"></div>
    </div>
</template>

<script>
export default {
    props: ['field'],
    data() {
        return {
            random: Math.round((1 + (Math.random() * 10)) ^ 999999999999999),
            fieldId: 'field-' + Math.round((1 + (Math.random() * 10)) ^ 999999999999999),
            datalistId: 'datalist-' + Math.round((1 + (Math.random() * 10)) ^ 999999999999999),
            isInvalid: false,
            initialValue: this.field.value,
            location: {},
            locationSuggestions: []
        }
    },
    methods: {
        change(target) {
            const value = this.clear(target.value)
            // console.log(value);
            if (this.validate(value) === false) {
                this.isInvalid = true
                return
            }
            this.isInvalid = false
            this.$emit('on-change', value)
        },
        // datalist
        // async initDatalist() {
        //     if (!this.field.datalist) return
        //     const dataListItems = await this.$api(this.field.datalist)
        //     console.log(dataListItems);
        // },
        // location
        async suggestLocation(query) {
            const response = await this.$axios(`https://api-adresse.data.gouv.fr/search/?q=${query}`);
            // console.log(response.data);
            this.locationSuggestions = response.data.features;
        },
        // fields
        clear(value) {
            if (['phone', 'email', "link"].includes(this.field.type)) {
                value = value.replace(/[\s\n\t]/gi, '')
            }
            return value
        },
        validate(value) {
            if (value !== '') {
                if (this.field.type === 'phone') {
                    if (/^\d{10}$/.test(value) === false) return false
                } else if (this.field.type === 'email') {
                    // console.log(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value));
                    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) === false) return false
                }
            }
            return true
        }
    },
    // mounted() {
    //     this.initDatalist()
    // }
}
</script>