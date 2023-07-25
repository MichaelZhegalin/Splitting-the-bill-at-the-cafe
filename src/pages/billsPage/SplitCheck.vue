<template>
  <div>Тут будем показывать результаты подсчетов</div>
  <button @click="deleteBill">Удалить чек</button>
</template>

<script>
export default {
  methods: {
    deleteBill(){
      if(this.$store.state.personsInfo.billList.length === 1 || this.$route.params.id === 1){
        this.$store.state.personsInfo.billList.shift()
      }else{
        for(let i in this.$store.state.personsInfo.billList){
        if(this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.id - 1)){
          this.$store.state.personsInfo.billList.splice(i, i)
        }
      }
      }
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>