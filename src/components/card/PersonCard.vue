<template>
    <div class="card card-size">
    <div class="card-body card-body-position-el">
      <h3 class="card-title">
        {{personName.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}}
      </h3>
      <p class="card-text">
        <ul class="list-group">
          <li class="list-group-item card__li">Потратил: {{ personSpend ?? 0 }} руб.</li>
          <li class="list-group-item card__li">Должен: {{ personDebtSum ?? 0 }}</li>
          <li class="list-group-item card__li">Ел блюд: {{ foodEatPerson ?? 0 }}</li>
        </ul>
      </p>
    </div>
  </div>
  </template>
  
  <script>
    export default {
      props: {
        personName: {
          type: String,
          required: true
        },
        personSpend: {
          type: Number,
          required: true
        },
        personDebtSum: {
          type: Number,
          required: true
        },
        foodEatPerson: {
          type: Number,
          required: true
        }
      }
    }
  </script>
  
  <style scoped>
  .card-size{
      width: 18rem; height: 20rem;
  } 
  </style>