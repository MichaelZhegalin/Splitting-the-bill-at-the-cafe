<template>
  <div :key="bill.id" v-for="bill in $store.state.personsInfo.billList">
    <div>{{ bill.number + 1}}</div>
    <bill-preview :test="bill.number + 1"></bill-preview>
  </div>

  <button @click="addNewBill">Добавить чек</button>
  
</template>

<script>
import BillPreview from '@/components/UI/BillPreview.vue'
export default {
  components: { BillPreview },
  methods: {
    addNewBill(){
      this.$store.commit('setBill', {number: Object.keys(this.$store.state.personsInfo.persons).length, id: Date.now()})
      this.$store.commit('setBillFood', {number: Object.keys(this.$store.state.foodInfo.food).length, id: Date.now()})
    },
  }

}
</script>

<style>

</style>