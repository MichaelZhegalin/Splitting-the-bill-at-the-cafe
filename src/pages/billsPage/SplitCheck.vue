<template>
  <div>Тут будем показывать результаты подсчетов</div>
  <button @click="deleteBill">Удалить чек</button>
</template>

<script>
export default {
  methods: {
    deleteBill(){
      for(let i in this.$store.state.personsInfo.billList){
        if(this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.id - 1) && i !== '0'){
          this.$store.state.personsInfo.billList.splice(i, i)
        }else if(this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.id - 1)){
          this.$store.state.personsInfo.billList.shift()
        }
      }
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>