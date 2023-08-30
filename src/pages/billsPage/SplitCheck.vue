<template>
  <div class="container container-internal-position">
    <div class="row">
      <div class="col col-margin">
        <split-check-card @delete="deleteBill"/>
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
          if (this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.billId - 1) && i !== '0'){
            this.$store.state.personsInfo.billList.splice(i, i);
          } else if (this.$store.state.personsInfo.billList[i].number === Number(this.$route.params.billId - 1)){
            this.$store.state.personsInfo.billList.shift();
          }
        }
        this.$store.commit('setShowBill', 0);
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .container-internal-position{
    display: flex; 
    justify-content: center;
  }
  .col-margin{
    margin: 10px;
  }
</style>