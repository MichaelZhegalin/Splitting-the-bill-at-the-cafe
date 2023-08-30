<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-brand nav-brand-style" @click="goToMain">
        <v-img 
          src="../img/cup.png" 
          width="55" 
          height="44" 
          class="d-inline-block align-text-top" 
          alt="Картинка потеряна :("
        />
        <span class="navbar-brand-text">Делим счет в кафе</span>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      goToMain(){
        if (this.$route.params.billId !== undefined){
          this.$store.commit('setShowFood', {billNumber: this.$route.params.billId, foodListEl: 0});
          this.$store.commit('setShowPerson', {billNumber: this.$route.params.billId, personListEl: 0});
        }
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .nav-brand-style{
    display: flex; 
    cursor: pointer;
  }
  .navbar-brand:hover{
    transition: ease-in 400ms;
    color: forestgreen
  }
  .navbar-brand-text{
    align-self: center;
    font-size: 24px;
    margin-left: 10px;
  }
</style>