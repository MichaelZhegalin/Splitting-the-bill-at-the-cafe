<template>

  <div style="overflow-y: auto; max-height: 75vh;">

    <modal-add-food @save="saveNewFood"></modal-add-food>

    <carousel-food-card></carousel-food-card>

    <div class="container">
      <div class="row" style="display: flex; align-items: center;">
        <div class="col btns">
          <v-btn @click="leftShift" v-if="shiftCounter !== 0">
            <v-img src="https://sun9-10.userapi.com/impg/uXVjwI7CPIX_xD1bVNMU71N6JB2F0pIl1vEqBg/t3cyzvrs6Ao.jpg?size=512x512&quality=96&sign=7af13afb3a033d167914009b805190b7&type=album" alt="Картинка потеряна :(" width="35" height="24"></v-img>
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn size="large" color="#0DCAF0" @click="addNewFood" data-bs-toggle="modal" data-bs-target="#foodModal">Добавить</v-btn>
        </div>
        <div class="col btns">
          <v-btn  @click="rigthShift" v-if="foodCounter - (shiftCounter + 1) * 3 > 0">
            <v-img src="https://sun9-33.userapi.com/impg/Am2RKr-vGSDptop3HWqYdvWTeE4KdSyXFY9_WQ/K9ac4Dbk618.jpg?size=512x512&quality=96&sign=a02e9fcc8d9d788446a81565c96cf79d&type=album" alt="Картинка потеряна :(" width="35" height="24"></v-img>
          </v-btn>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

import CarouselFoodCard from '@/components/carousel/CarouselFoodCard.vue';
import ModalAddFood from '@/components/modal/ModalAddFood.vue';

export default {
  components: { CarouselFoodCard, ModalAddFood },
  data(){
    return{
      shiftCounter: 0,
      storeFood: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`],
      foodCounter: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length === 0?0:this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length,
      allFood: new Set()
    }
  },
  methods: {
    addNewFood(){
      for (let i in this.storeFood){
        this.allFood.add(this.storeFood[i].name);
      }
    },
    addPersonSpandMoney(personEatFood, price){
      for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`]){
        if(personEatFood.includes(this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].name)){
          this.$store.commit('setPersonSpend', [price/personEatFood.length, this.$route.params.id, i]);
        }
      }
    },
    addPayPersonAndDebtOther(personEatFood, payPerson, price){
      let payPersonId = undefined;
      let payPersonNumber = undefined;
      let numPersonEatFood = personEatFood.length;
      for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`]){
        if(payPerson.localeCompare(this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].name) === 0){
          this.$store.commit('setPersonSpend', [Number(price), this.$route.params.id, i]);
          payPersonId = this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].id;
          payPersonNumber = i;
        }
      }
      for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`]){
        if(personEatFood.includes(this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].name) 
            &&
          this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].id !== payPersonId
        ){
          this.$store.commit('crossDebtCheck', {billNumber: this.$route.params.id, checkPersonNumber: payPersonNumber, personId: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].id})
          let crossDebt = this.$store.state.personsInfo.crossDebtCheck
          
          if(crossDebt !== 0){
            if(crossDebt < price/numPersonEatFood){
              this.$store.commit('clearDebt', {billNumber: this.$route.params.id, personNumber: payPersonNumber, debtId: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].id})
              this.$store.commit('setPersonDebt', [{id: payPersonId, debt: price/numPersonEatFood - crossDebt, namePerson: payPerson}, this.$route.params.id, i])
            }else if(crossDebt === price/numPersonEatFood){
              this.$store.commit('clearDebt', {billNumber: this.$route.params.id, personNumber: payPersonNumber, debtId: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].id})
              // this.$store.commit('clearDebt', {billNumber: this.$route.params.id, personNumber: i, debtId: payPersonId})
            }else{
              this.$store.commit('setPersonDebt', [{id: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].id, debt: -price/numPersonEatFood, namePerson: payPerson}, this.$route.params.id, payPersonNumber])
            }
          }else{
            this.$store.commit('setPersonDebt', [{id: payPersonId, debt: price/numPersonEatFood, namePerson: payPerson}, this.$route.params.id, i])
          }
        }
      }
    },
    saveNewFood(foodName, price, personDebt, personEatFood){
      if(!!Number(price) === false || Number(price) < 0){
        alert('Цена должна быть набрана числом и быть больше 0!')
      } 
      else if(foodName === '' || personEatFood.length === 0){
        alert('Сначала необходимо заполнить форму!')
      }else{
        if(personDebt !== '' && !this.allFood.has(foodName.toLocaleLowerCase())){

          this.allFood.add(foodName.toLocaleLowerCase());
          this.$store.commit('setFoodName', [foodName.toLocaleLowerCase(), this.$route.params.id, this.foodCounter]);
          this.$store.commit('setFoodPrice', [price, this.$route.params.id, this.foodCounter]);
          this.$store.commit('setFoodEatPersons', [personEatFood, this.$route.params.id, this.foodCounter]);
          this.$store.commit('setPaid', [personDebt, this.$route.params.id, this.foodCounter]);
          this.addPayPersonAndDebtOther(personEatFood, personDebt, price);
          this.foodCounter += 1;

          if(this.foodCounter < 4){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
          }else if(this.$store.state.foodInfo.foodListShow[`bill_${this.$route.params.id}`].length < 3){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 3 * this.shiftCounter})
          }
        }
        else if(!this.allFood.has(foodName.toLocaleLowerCase())){
          this.allFood.add(foodName.toLocaleLowerCase());
          this.$store.commit('setFoodName', [foodName.toLocaleLowerCase(), this.$route.params.id, this.foodCounter]);
          this.$store.commit('setFoodPrice', [price, this.$route.params.id, this.foodCounter]);
          this.$store.commit('setFoodEatPersons', [personEatFood, this.$route.params.id, this.foodCounter]);
          this.$store.commit('setPaid', ['Все, кто ел', this.$route.params.id, this.foodCounter]);
          this.addPersonSpandMoney(personEatFood, price);
          this.foodCounter += 1;

          if(this.foodCounter < 4){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
          }else if(this.$store.state.foodInfo.foodListShow[`bill_${this.$route.params.id}`].length < 3){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 3 * this.shiftCounter})
          }
        }else{
          alert('Еда с таким названием уже существует');
        }
      }
    },
    rigthShift(){
      this.shiftCounter += 1;
      this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 3 * this.shiftCounter});
    },
  leftShift(){
      this.shiftCounter -= 1;
      this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 3 * this.shiftCounter});
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