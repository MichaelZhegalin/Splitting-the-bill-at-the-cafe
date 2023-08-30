<template>
  <v-dialog v-model="show" transition="dialog-top-transition" width="20rem">
    <v-card class="card-padding">
      <v-toolbar color="info" title="Заполните форму"/>
      <v-form @submit.prevent>
        <v-text-field
          :value="foodName" 
          @input="foodName = $event.target.value"
          :rules="rulesFood"
          label="Блюдо"
          variant="underlined"
        />
        <v-text-field
          :value="price" 
          @input="price = $event.target.value" 
          type="number"
          :rules="rulesPrice"
          label="Цена"
          variant="underlined"
        />
        <v-select
          clearable
          multiple
          v-model="personEatFood"
          label="Люди, евшие блюдо"
          :items="$store.state.personsInfo.personList[$route.params.billId - 1]"
          variant="underlined"
        />
        <div v-if="!debtVisible" class="food-form-choose-paid-person">
          <p class="modal-help-text">Если платит кто-то один, то нажмите кнопку: </p>
          <v-btn @click="debtPersonVisible" class="btn btn-secondary">Выбрать</v-btn>
        </div>
        <div v-else class="food-form-choose-paid-person">
          <v-select 
            v-model="personDebt" 
            :items="$store.state.personsInfo.personList[$route.params.billId - 1]" 
            label="За блюдо платит:"
            class="select-size"
            variant="underlined"
          />
          <v-btn @click="debtPersonVisible" class="btn btn-danger">Отмена</v-btn>
        </div>
        <v-btn 
          @click="saveNewFood" 
          type="submit" 
          block 
          class="mt-2 text-white btn-color"
        >
          Сохранить
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
        showModal: Boolean,
    },
    data(){
      return{
        debtVisible: false,
        personDebt: '',
        personEatFood: [],
        foodName: '',
        price: '',
        rulesFood: [
          value =>{
            if (value){
              return true
            } 
            return 'Необходимо ввести название блюда'
          }
        ],
        rulesPrice: [
          value =>{
            if (value){
              return true
            } 
            return 'Необходимо ввести цену блюда'
          }
        ],
      }
    },
    methods: {
        debtPersonVisible(){
          this.debtVisible = !this.debtVisible;
          this.personDebt = '';
        },
        saveNewFood(){
          this.$emit('save', this.foodName, this.price, this.personDebt, this.personEatFood);
          this.personDebt = '';
          this.price = '';
          this.foodName = '';
          this.personEatFood = [];
        },
    },
    computed: {
      show: {
          get(){
            return this.showModal;
          },
          set (value) {
            this.$emit('input', value)
          }
      }
    },
  }
</script>

<style scoped>
  .card-padding{
    padding: 15px;
  }
  .select-size{
    width: 100%;
  }
  .btn-color{
    background-color: forestgreen;
  }
  .food-form-choose-paid-person{
    margin-top: 0;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .modal-help-text{
    margin-bottom: 6px;
  }
</style>