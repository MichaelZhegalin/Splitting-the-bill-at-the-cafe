<template>
  <div class="food-size food-overflow">
    <modal-add-food @save="saveNewFood" v-model="showModal"/>
    <carousel-food-card/>
    <div class="container">
      <div class="row row-internal-position">
        <div class="col btns">
          <v-btn @click="leftShift" v-if="shiftCounter !== 0">
            <v-img 
              :src="require('/src/img/leftArrow.png')" 
              alt="Картинка потеряна :(" 
              width="35" 
              height="24"
            />
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn 
            size="large" 
            color="#0DCAF0" 
            @click="addNewFood" 
          >
            Добавить
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn  @click="rightShift" v-if="foodCounter - (shiftCounter + 1) * 3 > 0">
            <v-img 
              :src="require('/src/img/rightArrow.png')" 
              alt="Картинка потеряна :(" 
              width="35" 
              height="24"
            />
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
        storeFood: this.$store.state.foodInfo.food[`bill_${this.$route.params.billId}`],
        foodCounter: 
          this.$store.state.foodInfo.food[`bill_${this.$route.params.billId}`].length === 0
          ? 0
          : this.$store.state.foodInfo.food[`bill_${this.$route.params.billId}`].length,
        allFood: new Set(),
        showModal: false
      }
    },
    methods: {
      addNewFood(){
        this.showModal = true;
        for (let i in this.storeFood){
          this.allFood.add(this.storeFood[i].name);
        }
      },
      addPersonSpandMoney(personEatFood, price){
        for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`]){
          if (personEatFood.includes(this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].name)){
            this.$store.commit('setPersonSpend', [price/personEatFood.length, this.$route.params.billId, i]);
          }
        }
      },
      addPayPersonAndDebtOther(personEatFood, payPerson, price){
        let payPersonId = undefined;
        let payPersonNumber = undefined;
        let numPersonEatFood = personEatFood.length;
        for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`]){
          if (payPerson.localeCompare(this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].name) === 0){
            this.$store.commit('setPersonSpend', [Number(price), this.$route.params.billId, i]);
            payPersonId = this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].id;
            payPersonNumber = i;
          }
        }
        for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`]){
          if (personEatFood.includes(this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].name) 
              &&
            this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].id !== payPersonId
          ){
            this.$store.commit(
              'crossDebtCheck', 
              {
                billNumber: this.$route.params.billId, 
                checkPersonNumber: payPersonNumber, 
                personId: this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].id
              }
            )
            let crossDebt = this.$store.state.personsInfo.crossDebtCheck;
            if (crossDebt !== 0){
              if (crossDebt < price/numPersonEatFood){
                this.$store.commit(
                  'clearDebt', 
                  {
                    billNumber: this.$route.params.billId, 
                    personNumber: payPersonNumber, 
                    debtId: this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].id
                  }
                )
                this.$store.commit(
                  'setPersonDebt', 
                  [
                    {
                      id: payPersonId, debt: price/numPersonEatFood - crossDebt, 
                      namePerson: payPerson
                    }, 
                    this.$route.params.billId,
                    i
                  ]
                )
              } else if (crossDebt === price/numPersonEatFood){
                this.$store.commit(
                  'clearDebt', 
                  {
                    billNumber: this.$route.params.billId, 
                    personNumber: payPersonNumber, 
                    debtId: this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].id
                  }
                )
              } else {
                this.$store.commit(
                  'setPersonDebt', 
                  [
                    {
                      id: this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`][i].id, 
                      debt: -price/numPersonEatFood,
                      namePerson: payPerson
                    }, 
                    this.$route.params.billId, 
                    payPersonNumber
                  ]
                )
              }
            } else {
              this.$store.commit(
                'setPersonDebt',
                [
                  {
                    id: payPersonId, 
                    debt: price/numPersonEatFood, 
                    namePerson: payPerson
                  }, 
                  this.$route.params.billId, 
                  i
                ]
              )
            }
          }
        }
      },
      saveNewFood(foodName, price, personDebt, personEatFood){
        if (!!Number(price) === false || Number(price) < 0){
          alert('Цена должна быть набрана числом и быть больше 0!');
        } else if (foodName === '' || personEatFood.length === 0){
          alert('Сначала необходимо заполнить форму!');
        } else {
          if (personDebt !== '' && !this.allFood.has(foodName.toLocaleLowerCase())){
            this.allFood.add(foodName.toLocaleLowerCase());
            this.$store.commit('setFoodName', [foodName.toLocaleLowerCase(), this.$route.params.billId, this.foodCounter]);
            this.$store.commit('setFoodPrice', [price, this.$route.params.billId, this.foodCounter]);
            this.$store.commit('setFoodEatPersons', [personEatFood, this.$route.params.billId, this.foodCounter]);
            this.$store.commit('setPaid', [personDebt, this.$route.params.billId, this.foodCounter]);
            this.addPayPersonAndDebtOther(personEatFood, personDebt, price);
            this.foodCounter += 1;
            if (this.foodCounter < 4){
              this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 0})
            } else if (this.$store.state.foodInfo.foodListShow[`bill_${this.$route.params.billId}`].length < 3){
              this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 3 * this.shiftCounter})
            }
          } else if (!this.allFood.has(foodName.toLocaleLowerCase())){
            this.allFood.add(foodName.toLocaleLowerCase());
            this.$store.commit('setFoodName', [foodName.toLocaleLowerCase(), this.$route.params.billId, this.foodCounter]);
            this.$store.commit('setFoodPrice', [price, this.$route.params.billId, this.foodCounter]);
            this.$store.commit('setFoodEatPersons', [personEatFood, this.$route.params.billId, this.foodCounter]);
            this.$store.commit('setPaid', ['Все, кто ел', this.$route.params.billId, this.foodCounter]);
            this.addPersonSpandMoney(personEatFood, price);
            this.foodCounter += 1
            if (this.foodCounter < 4){
              this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 0})
            } else if (this.$store.state.foodInfo.foodListShow[`bill_${this.$route.params.billId}`].length < 3){
              this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 3 * this.shiftCounter})
            }
          } else {
            alert('Еда с таким названием уже существует');
          }
        }
      },
      rightShift(){
        this.shiftCounter += 1;
        this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 3 * this.shiftCounter});
      },
      leftShift(){
        this.shiftCounter -= 1;
        this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 3 * this.shiftCounter});
      },
    }
  }
</script>

<style scoped>
  .row-internal-position{
    display: flex; 
    align-items: center;
  }
  .food-size{
    max-height: 75vh;
  }
  .food-overflow{
    overflow-y: auto;
  }
  .btns{
    display: flex;
    justify-content: center;
  }
</style>