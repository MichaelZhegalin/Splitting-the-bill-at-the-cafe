<template>
  <div>Тут будем вводить человеков</div>
  <div :key="person.id" v-for="person in $store.state.personsInfo.persons[`bill_${$route.params.id}`]">{{person.name}}</div>
  <div v-if="addPersonVisible">
    <input type="text" :value="namePerson" @input="namePerson = $event.target.value" placeholder="Введите имя человека">
    <button @click="savePerson">Сохранить</button>
  </div>
  
  <button v-else @click="addNewPerson">Добавить</button>
  
  <div>{{ $store.state.personsInfo }}</div>

</template>

<script>
export default {
 data(){
  return{
    storePerson: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`],
    namePerson: '',
    addPersonVisible: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`].length === 0?true:false,
    personCounter: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`].length === 0?0:this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`].length - 1,
    allPerson: new Set()
  }
 },
 methods: {
  addNewPerson(){
    for (let i in this.storePerson){
      this.allPerson.add(this.storePerson[i].name)
    }
    this.addPersonVisible = true
    this.personCounter += 1
  },
  savePerson(){
    if(!this.allPerson.has(this.namePerson.toLocaleLowerCase())){
      this.allPerson.add(this.namePerson.toLocaleLowerCase())
      this.$store.commit('setPersonList', {array: Array.from(this.allPerson), number: this.$route.params.id - 1})
      this.$store.commit('setPersonName', [this.namePerson.toLocaleLowerCase(), this.$route.params.id, this.personCounter])
      this.addPersonVisible = false
      this.namePerson = ''
    }else{
      alert('Пользователь с таким именем уже существует!')
    }
  }
 }
}
</script>

<style>

</style>