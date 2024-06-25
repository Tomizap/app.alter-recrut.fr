<template>
  <div :style="{width: size ? size : '3rem', height: size ? size : '3rem'}" role="status" 
    :class="'spinner-border ' + (color ? color : 'text-dark')">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
export default {
  props: ['color', 'size']
}
</script>
