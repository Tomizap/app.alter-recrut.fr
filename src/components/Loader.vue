<template>
    <div class="spinner-border" :style="{width: width || '3rem', height: height || '3rem'}" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
</template>

<script>
export default {
  props: ['width', 'height']
}
</script>