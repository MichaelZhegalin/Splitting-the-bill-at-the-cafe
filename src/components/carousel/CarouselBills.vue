<template>
  <carousel>
    <transition-group name="bill-list">
      <div 
        class="col bill-list-item" 
        :key="bill.id" 
        v-for="bill in $store.state.personsInfo.billListShow"
      >
        <bill-preview :billNumber="bill.number + 1"/>
      </div>
    </transition-group>
  </carousel>
</template>

<script>
  import BillPreview from '@/components/BillPreview.vue'
  import Carousel from './Carousel.vue'
  export default {
    components: { BillPreview, Carousel },
  }
</script>

<style scoped>
  .bill-list-item {
    transition: all 0.5s ease;
    display: flex; 
    justify-content: center; 
    margin: 10px;
  }
  .bill-list-enter-from,
  .bill-list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
  .bill-list-leave-active {
    position: absolute;
  }
</style>