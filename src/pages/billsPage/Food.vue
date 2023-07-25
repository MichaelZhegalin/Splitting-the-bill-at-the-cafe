<template>
  <div>Тут будем собирать данные о еде</div>
  <div :key="food.id" v-for="food in $store.state.foodInfo.food[`bill_${$route.params.id}`]">{{food.name}} стоит {{food.price}} руб.</div>

  <form>
    <div v-if="addFoodVisible">
      <input :value="foodName" @input="foodName = $event.target.value" type="text" placeholder="Название блюда">
      <input :value="price" @input="price = $event.target.value" type="number" placeholder="Стоимость">
      <div class="form-check" :key="person" v-for="person in $store.state.personsInfo.personList[$route.params.id - 1]">
        <input class="form-check-input" type="checkbox" :value="person" v-model="personEatFood"> {{ person }}
      </div>

      <div v-if="!debtVisible">
        <span>Если платит кто-то один, то нажмите эту кнопку: </span>
        <button @click="debtPersonVisible">Выбрать</button>
      </div>

      <div v-else>
        <select :key="person" v-for="person in $store.state.personsInfo.personList[$route.params.id]">
          <option>{{ person }}</option>
        </select>
        <button @click="debtPersonVisible">Спрятать</button>
      </div>
      
      <button @click="saveNewFood">Сохранить</button>
    </div>
    
   <button v-else @click="addNewFood">Добавить</button>
  </form>
  
  <div>{{ $store.state.foodInfo.food }}</div>

</template>

<script>

export default {
  data(){
    return{
      debtVisible: false,
      personEatFood: [],
      storeFood: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`],
      addFoodVisible: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length === 0?true:false,
      price: 0,
      foodName: '',
      foodCounter: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length === 0?0:this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length - 1,
      allFood: new Set()
    }
  },
  methods: {
    addNewFood(){
    for (let i in this.storeFood){
      this.allFood.add(this.storeFood[i].name)
    }
    this.addFoodVisible = true
    this.foodCounter += 1
  },
    addPersonEatFood(checkboxPersonEatFood){
      let personEatFood = [];
      for(let i in checkboxPersonEatFood){
        personEatFood.push(this.$store.state.personsInfo.personList[this.$route.params.id - 1][i])
      }

      return personEatFood
    },
    addPersonSpandMoney(personEatFood){
      for(let i in this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`]){
        if(personEatFood.includes(this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`][i].name)){
          this.$store.commit('setPersonSpend', [this.price/personEatFood.length, this.$route.params.id, i])
        }
      }
    },
    saveNewFood(){
      if(!this.allFood.has(this.foodName.toLocaleLowerCase())){
        this.allFood.add(this.foodName.toLocaleLowerCase())
        this.$store.commit('setFoodName', [this.foodName.toLocaleLowerCase(), this.$route.params.id, this.foodCounter])
        this.$store.commit('setFoodPrice', [this.price, this.$route.params.id, this.foodCounter])
        this.$store.commit('setFoodEatPersons', [this.addPersonEatFood(this.personEatFood), this.$route.params.id, this.foodCounter])
        this.addPersonSpandMoney(this.personEatFood)
        this.addFoodVisible = false
        this.price = 0
        this.foodName = ''
        this.personEatFood = []
      }else{
        alert('Пользователь с таким именем уже существует!')
      }
    },
    debtPersonVisible(){
      this.debtVisible = !this.debtVisible
    }
  }
}
</script>

<style>

</style>