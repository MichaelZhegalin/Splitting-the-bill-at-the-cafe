<template>
  <div style="overflow-y: auto; max-height: 85vh;">
    <carousel-bills></carousel-bills>
    <div class="container">
      <div class="row" style="display: flex; align-items: center;">
        <div class="col btns">
          <v-btn @click="leftShift" v-if="shiftCounter !== 0">
            <v-img src="../img/leftArrow.png" alt="Картинка потеряна :(" width="35" height="24"></v-img>
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn size="large" color="#0DCAF0" @click="addNewBill">Добавить чек</v-btn>
        </div>
        <div class="col btns">
          <v-btn  @click="rigthShift" v-if="$store.state.personsInfo.billList.length - (shiftCounter + 1) * 3 > 0">
            <v-img src="../img/rightArrow.png" alt="Картинка потеряна :(" width="35" height="24"></v-img>
          </v-btn>
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