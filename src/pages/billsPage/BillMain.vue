<template>
  <div class="container container-internal-position">
    <div class="row">
      <div class="col col-margin">
        <bill-card/>
      </div>
    </div>
  </div>
</template>

<script>
  import BillCard from '@/components/card/BillCard.vue'
  export default {
    components: { BillCard },
  }
</script>

<style scoped>
  .container-internal-position{
    display: flex; 
    justify-content: center;
  }
  .col-margin{
    margin: 10px;
  }
</style>