<template>
  <div class="carousel">
    <div class="container" style=" margin-bottom: 35px;">
      <div class="row">
        <transition-group name="bill-list">
          <div class="col bill-list-item" :key="bill.id" v-for="bill in $store.state.personsInfo.billListShow">
            <bill-preview :billNumber="bill.number + 1"></bill-preview>
          </div>
        </transition-group>
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