<template>
  <div class="card card-size">
    <div class="card-body card-body-position-el">
      <h3 class="card-title">
        {{foodName.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')}}
      </h3>
      <p class="card-text">
        <ul class="list-group">
          <li class="list-group-item card__li">Стоимость: {{ foodPrice }} руб.</li>
          <li class="list-group-item card__li">Сколько человек ело: {{ numPersonEat }}</li>
          <li class="list-group-item card__li">Ели: {{ personList }}</li>
          <li class="list-group-item card__li">Кто платил: {{ whoPaid }}</li>
        </ul>
      </p>
    </div>
  </div>
</template>
  
<script>
  export default {
    props: {
      foodName: {
        type: String,
        required: true
      },
      personList: {
        type: String,
        required: true
      },
      foodPrice: {
        type: Number,
        required: true
      },
      numPersonEat: {
        type: Number,
        required: true
      },
      whoPaid: {
        type: String,
        required: true
      },
    }

  }
</script>
  
<style scoped>
  .card-size{
    width: 18rem; height: 20rem;
  }
</style>