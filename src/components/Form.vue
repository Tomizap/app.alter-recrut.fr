<template>
    <div>
        <form @submit.prevent="callback">
            <Field v-for="(field, index) in fields" :key="index" @on-change="value => {[field.name] = value}"></Field>
        </form>
    </div>
</template>

<script>
export default {
    props: ['fields', 'callback']
}
</script>