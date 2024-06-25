<template>
    <div class="btn-group">
        <div class="border rounded p-2 pt-4 mt-3 w-100" style="position: relative;">
            <div v-if="text" class="bg-white border rounded px-2" style="position: absolute; top: -14px;">
                {{ text }}
            </div>
            <slot name="button"></slot>
            <button v-if="config" type="button"
                class="px-1 py-0 border rounded btn dropdown-toggle dropdown-toggle-split btn icon"
                data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
                <slot name="content"></slot>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['text', 'config']
}
</script>