<template>
    <div class="modal fade" id="foodModal" tabindex="-1" aria-labelledby="foodModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="foodModalLabel">Заполните форму</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body modal-body-style">
          <form @submit.prevent class="foodForm">
              <div>
                <input :value="foodName" @input="foodName = $event.target.value" type="text" placeholder="Название блюда" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
                <input :value="price" @input="price = $event.target.value" type="number" placeholder="Стоимость" class="form-control" aria-label="Username" aria-describedby="addon-wrapping">
              </div>
              <div>
                <h6 style="text-align: center;">Выберите людей, евших блюдо: </h6>
                <div class="form-check" :key="person" v-for="person in $store.state.personsInfo.personList[$route.params.id - 1]">
                  <input :id="person" class="form-check-input" style="border: 2px solid red; height: 2vh width: 2vw;" type="checkbox" :value="person" v-model="personEatFood">
                  <label class="form-check-label" :for="person">{{ person }}</label>
                </div>
              </div>
              

              <div v-if="!debtVisible" class="foodForm__choosePaidPerson">
                <p class="modal__helpText">Если платит кто-то один, то нажмите кнопку: </p>
                <button @click="debtPersonVisible" type="button" class="btn btn-secondary">Выбрать</button>
              </div>

              <div v-else class="foodForm__choosePaidPerson">
                <select v-model="personDebt" class="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option :key="person" :value="person" v-for="person in $store.state.personsInfo.personList[$route.params.id - 1]">{{ person }}</option>
                </select>
                <button @click="debtPersonVisible" type="button" class="btn btn-danger">Спрятать</button>
              </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="saveNewFood" type="button" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                debtVisible: false,
                personDebt: '',
                personEatFood: [],
                foodName: '',
                price: ''
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
            }
        }
    }
</script>

<style scoped>
.modal-body-style{
  background-color: whitesmoke;
}
.foodForm__choosePaidPerson{
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.modal__helpText{
  margin-bottom: 6px;
}

.foodForm{
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>