<template>
    <div>
        <div class="border rounded p-2 pt-4 mt-3 w-100" style="position: relative;">
            <div v-if="title" class="bg-white border rounded px-2" style="position: absolute; top: -14px;">
                <slot name="header">{{ title }}</slot>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>