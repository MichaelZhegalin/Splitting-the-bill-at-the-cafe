<template>
    <div class="card card-size card-padding">
      <div class="card-body card-body-position-el">
        <h3 class="card-title">Делим счет в кафе!</h3>
        <div v-if="showSplitCheck" class="card-info">
          <p class="card-text">
              <ul 
                class="list-group" 
                :key="person.id" 
                v-for="person in $store.state.personsInfo.persons[`bill_${$route.params.billId}`]"
              >
                <li class="list-group-item card-li">
                  {{person.name.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}}:
                  потратил {{ person.spend }} руб. 
                  <span v-if="person.debt.length !== 0">
                    и должен: {{ person.debt.map(el => [el.namePerson, el.debt, 'руб.'].join(' ')).join(' ')}}
                  </span>
                </li>
              </ul>
          </p>
          <button type="button" class="btn btn-danger btn-lg" @click="deleteBill">Удалить чек</button>
        </div>
        <div v-else class="card-help-text">
          <h4>Пока нечего делить :(</h4>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
        data(){
            return{
              showSplitCheck: this.$store.state.foodInfo.food[`bill_${this.$route.params.billId}`].length === 0
              ?false
              :true,
            }
        },
        methods: {
          deleteBill(){
              this.$emit('delete');
          }
        }
    }
  </script>
  
<style scoped>
  .card-size{
    width: 24rem; height: 26rem;
  }
  .card-padding{
    padding: 10px;
  }
  .card-help-text{
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 20rem;
  }
  .card-info{
    display: flex; 
    flex-direction: column;
    gap: 10px; 
    min-height: 20rem; 
    justify-content: space-between; 
    align-items: center;
  }
</style>