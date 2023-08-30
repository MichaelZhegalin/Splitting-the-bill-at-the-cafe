<template>
  <div class="card card-size">
    <div class="card-body card-body-position-el">
      <h3 class="card-title">Счет номер {{ billNumber }}</h3>
      <p class="card-text">
        <ul class="list-group">
          <li class="list-group-item card__li">
            Всего человек: {{$store.state.personsInfo.persons[`bill_${billNumber}`].length}}
          </li>
          <li class="list-group-item card__li">
            Всего блюд: {{$store.state.foodInfo.food[`bill_${billNumber}`].length}}
          </li>
          <li class="list-group-item card__li">
            Общая сумма счета:
            {{ $store.state.personsInfo.allPersonsSpend[`bill_${billNumber}`] ?? 0 }}
          </li>
        </ul>
      </p>
      <v-btn size="large" color="#0D6EFD" @click="$router.push(`/bill/${billNumber}`)">Открыть Счет</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      billNumber: {
        type: Number,
        required: true
      }
    }

  }
</script>

<style scoped>
  .card-size{
    width: 18rem; 
    height: 20rem;
  }
</style>