<template>
  <div class="card card-size">
    <div class="card-body overflow-card">
      <h4 class="card-title card-title-position">Счет номер {{ $route.params.billId }}</h4>
      <div v-if="showBillCheck" class="card-info">
        <p  class="card-text">
            <ul 
              class="list-group" 
              :key="food.id" 
              v-for="food in $store.state.foodInfo.food[`bill_${$route.params.billId}`]"
            >
              <li class="list-group-item card-li">{{food.name}}: {{ food.price }} руб.</li>
            </ul>
        </p>
        <h5>Общая сумма: {{ $store.state.personsInfo.allPersonsSpend[`bill_${$route.params.billId}`] }}</h5>
      </div>
      <div v-else class="card-helpHeader">
        <h4>Данный счет пока пуст :(</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
              showBillCheck: this.$store.state.foodInfo.food[`bill_${this.$route.params.billId}`].length === 0?false:true,
          }
      }
  }
</script>

<style scoped>
  .card-title-position{
    text-align: center;
  }
  .overflow-card{
    overflow: auto;
  }
  .card-size{
    width: 24rem; 
    height: 26rem;
  }
  .card-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 20rem;
  }
  .card-li{
    font-size: 18px;
    width: 15rem;
  }
  .card-helpHeader{
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 20rem;
  }
</style>