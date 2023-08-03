<template>
  <div class="container" style="display: flex; justify-content: center;">
    <div class="row">
      <div class="col" style="margin: 10px;">
        <split-check-card @delete="deleteBill"></split-check-card>
      </div>
    </div>
  </div>
</template>

<script>
import SplitCheckCard from '@/components/card/SplitCheckCard.vue'
export default {
  components: { SplitCheckCard },
  methods: {
    deleteBill(){
      for(let i in this.$store.state.personsInfo.billList){
        if(this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.id - 1) && i !== '0'){
          this.$store.state.personsInfo.billList.splice(i, i)
        }else if(this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.id - 1)){
          this.$store.state.personsInfo.billList.shift()
        }
      }
      this.$store.commit('setShowBill', 0)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>