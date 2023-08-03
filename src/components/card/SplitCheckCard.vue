<template>
    <div class="card" style="padding: 10px; width: 24rem; height: 26rem;">
      <div class="card-body card-body-position-el">
        <h3 class="card-title">Делим счет в кафе!</h3>
        <div v-if="showSplitCheck" class="card__info">
          <p class="card-text">
              <ul class="list-group" :key="person.id" v-for="person in $store.state.personsInfo.persons[`bill_${$route.params.id}`]">
                  <li class="list-group-item card__li">
                    {{person.name.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}}: потратил {{ person.spend }} руб. 
                    <span v-if="person.debt.length !== 0">
                      и должен: {{ person.debt.map(el => [el.namePerson, el.debt, 'руб.'].join(' ')).join(' ')}}
                    </span>
                  </li>
              </ul>
          </p>
          <button type="button" class="btn btn-danger btn-lg" @click="deleteBill">Удалить чек</button>
        </div>
        <div v-else class="card__helpText">
          <h4>Пока нечего делить :(</h4>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      data(){
          return{
            showSplitCheck: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length === 0?false:true,
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

  .card__helpText{
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 20rem;
  }
  .card__info{
    display: flex; 
    flex-direction: column;
    gap: 10px; 
    min-height: 20rem; 
    justify-content: space-between; 
    align-items: center;
  }
  </style>