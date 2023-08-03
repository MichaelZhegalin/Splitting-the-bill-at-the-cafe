<template>
  
  <div class="container" style="display: flex; justify-content: center;">
    <div class="row">
      <div class="col" style="margin: 10px;">
        <bill-card></bill-card>
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

<style>

</style>