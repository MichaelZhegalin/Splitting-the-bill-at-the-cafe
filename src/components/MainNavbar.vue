<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-brand" style="display: flex; cursor: pointer;" @click="goToMain">
        <img src="../img/cup.png" alt="Картинка потеряна :(" width="55" height="44" class="d-inline-block align-text-top">
        <span class="navbar-brand-text">Делим счет в кафе</span>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  methods: {
    goToMain(){
      if(this.$route.params.id !== undefined){
        this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
        this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 0})
      }
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

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