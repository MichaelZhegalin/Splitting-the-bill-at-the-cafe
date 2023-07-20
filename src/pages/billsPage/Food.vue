<template>
  <div>Тут будем собирать данные о еде</div>
  <div>{{ $store.state.foodInfo.food }}</div>
  <button @click="$store.commit('setBill', 1)">добавим чутка</button>
  <button @click="$store.commit('setFoodName', ['Яблоко', 1, 0])">Изменим имя</button>
  <button @click="$store.commit('setFoodPrice', [30, 1, 0])">Изменим затраты</button>
  <button @click="$store.commit('setFoodEatPersons', [['Мишок', 'Васек'], 1, 0])">Изменим едоков</button>
</template>

<script>

export default {

}
</script>

<style>

</style>