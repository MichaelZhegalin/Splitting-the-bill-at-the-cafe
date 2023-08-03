<template>
  <div style="overflow-y: auto; max-height: 85vh;">
    <carousel-bills></carousel-bills>
    <div class="container">
      <div class="row" style="display: flex; align-items: center;">
        <div class="col btns">
          <img @click="leftShift" v-if="shiftCounter !== 0" src="../img/leftArrow.png" alt="Картинка потеряна :(" width="45" height="34" class="btn btn-light d-inline-block align-text-top">
        </div>
        <div class="col btns">
          <button class="btn btn-info btn-lg" @click="addNewBill">Добавить чек</button>
        </div>
        <div class="col btns">
          <img @click="rigthShift" v-if="$store.state.personsInfo.billList.length - (shiftCounter + 1) * 3 > 0" src="../img/rightArrow.png" alt="Картинка потеряна :(" width="45" height="34" class="btn btn-light d-inline-block align-text-top">
        </div>
      </div>
    </div>
  </div>
  

</template>

<script>
import CarouselBills from '@/components/carousel/CarouselBills.vue'
export default {
  data(){
    return{
      billList: [],
      shiftCounter: 0,
    }
  },
  components: { CarouselBills },
  methods: {
    addNewBill(){
      this.$store.commit('setBill', {number: Object.keys(this.$store.state.personsInfo.persons).length, id: Date.now()})
      this.$store.commit('setBillFood', {number: Object.keys(this.$store.state.foodInfo.food).length, id: Date.now()})
      if(this.$store.state.personsInfo.billList.length < 4){
        this.$store.commit('setShowBill', 0)
      }else if(this.$store.state.personsInfo.billListShow.length < 3){
        this.$store.commit('setShowBill', 3 * this.shiftCounter)
      }
    },
    rigthShift(){
      this.shiftCounter += 1;
      this.$store.commit('setShowBill', 3 * this.shiftCounter)
    },
    leftShift(){
      this.shiftCounter -= 1;
      this.$store.commit('setShowBill', 3 * this.shiftCounter)
    },
  }

}
</script>

<style scoped>

.btns{
  display: flex;
  justify-content: center;
}
</style>