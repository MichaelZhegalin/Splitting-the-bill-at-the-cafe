<template>
  <div>Тут будем вводить человеков</div>
  <div :key="person.id" v-for="person in $store.state.personsInfo.persons[`bill_${$route.params.id}`]">{{person.name}}</div>
  <input v-if="inputVisible" type="text" :value="namePerson" @input="namePerson = $event.target.value" placeholder="Введите имя человека">
  <button v-else @click="addNewPerson">Добавить</button>
  <button @click="console.log($store.state.personsInfo.persons[`bill_1`])">Проверка</button>
  <button @click="savePerson">Сохранить</button>
  <div>{{ $store.state.personsInfo }}</div>
  <button @click="$store.commit('setBill', 1)">добавим чутка</button>
  <button @click="$store.commit('setPersonName', ['Гриша', 1, 1])">Изменим имя</button>
  <button @click="$store.commit('setPersonSpend', [100, 1, 1])">Изменим затраты</button>
  <button @click="$store.commit('setPersonDebt', [{id: 2, money: 200}, 1, 1])">Изменим задолженность</button>
</template>

<script>
export default {
 data(){
  return{
    namePerson: '',
    inputVisible: true,
    personeCounter: 0
  }
 },
 methods: {
  addNewPerson(){
    this.inputVisible = true
    this.personeCounter += 1

  },
  savePerson(){
    console.log(this.$route.params.id)
    this.$store.commit('setPersonName', [this.namePerson, this.$route.params.id, this.personeCounter])
    this.inputVisible = false
  }
 }
}
</script>

<style>

</style>