<template>
    <div class="carousel">
      <div class="container carousel-container-margin">
        <div class="row">
            <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import BillPreview from '@/components/BillPreview.vue'
    export default {
      components: { BillPreview },
    }
  </script>
  
<style scoped>
  .carousel-container-margin{
    margin-bottom: 35px;
  }
</style>