<template>
  <div class="main-page-size main-page-overflow">
    <carousel-bills/>
    <div class="container">
      <div class="row row-internal-position">
        <div class="col btns">
          <v-btn @click="leftShift" v-if="shiftCounter !== 0">
            <v-img src="../img/leftArrow.png" alt="Картинка потеряна :(" width="35" height="24"/>
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn size="large" color="#0DCAF0" @click="addNewBill">Добавить чек</v-btn>
        </div>
        <div class="col btns">
          <v-btn  
            @click="rightShift" 
            v-if="$store.state.personsInfo.billList.length - (shiftCounter + 1) * 3 > 0"
          >
            <v-img src="../img/rightArrow.png" alt="Картинка потеряна :(" width="35" height="24"/>
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
        shiftCounter: 0,
      }
    },
    components: { CarouselBills },
    methods: {
      addNewBill(){
        this.$store.commit('setBill', {number: Object.keys(this.$store.state.personsInfo.persons).length, id: Date.now()});
        this.$store.commit('setBillFood', {number: Object.keys(this.$store.state.foodInfo.food).length, id: Date.now()});
        if (this.$store.state.personsInfo.billList.length < 4){
          this.$store.commit('setShowBill', 0);
        } else if (this.$store.state.personsInfo.billListShow.length < 3){
          this.$store.commit('setShowBill', 3 * this.shiftCounter);
        }
      },
      rightShift(){
        this.shiftCounter += 1;
        this.$store.commit('setShowBill', 3 * this.shiftCounter);
      },
      leftShift(){
        this.shiftCounter -= 1;
        this.$store.commit('setShowBill', 3 * this.shiftCounter);
      },
    }

  }
</script>

<style scoped>
  .row-internal-position{
    display: flex; 
    align-items: center;
  }
  .main-page-size{
    max-height: 85vh;
  }
  .main-page-overflow{
    overflow-y: auto;
  }
  .btns{
    display: flex;
    justify-content: center;
  }
</style>