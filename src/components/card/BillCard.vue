<template>
  <div class="card card-size">
    <div class="card-body" style="overflow: auto;">
      <h4 class="card-title" style="text-align: center;">Счет номер {{ $route.params.id }}</h4>
      <div v-if="showBillCheck" class="card__info">
        <p  class="card-text">
            <ul class="list-group" :key="food.id" v-for="food in $store.state.foodInfo.food[`bill_${$route.params.id}`]">
                <li class="list-group-item card__li">{{food.name}}: {{ food.price }} руб.</li>
            </ul>
        </p>
        <h5>Общая сумма: {{ $store.state.personsInfo.allPersonsSpend[`bill_${$route.params.id}`] }}</h5>
      </div>
      <div v-else class="card__helpHeader">
        <h4>Данный счет пока пуст :(</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showBillCheck: this.$store.state.foodInfo.food[`bill_${this.$route.params.id}`].length === 0?false:true,
        }
    }
}
</script>

<style scoped>
  .card-size{
    width: 24rem; 
    height: 26rem;
  }

  .card__info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 20rem;
  }

  .card__li{
    font-size: 18px;
    width: 15rem;
  }

  .card__helpHeader{
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 20rem;
  }
</style>