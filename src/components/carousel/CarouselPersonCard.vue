<template>
  <carousel>
    <transition-group name="person-list">
      <div 
        class="col person-list-item" 
        :key="person.id" 
        v-for="person in $store.state.personsInfo.personListShow[`bill_${this.$route.params.billId}`]"
      >
        <person-card 
          :personName="person.name" 
          :personSpend="person.spend" 
          :personDebtSum="person.debtSum" 
          :foodEatPerson="person.foodEatPerson"
        />
      </div>
    </transition-group>
  </carousel>
</template>
  
<script>
  import PersonCard from '../card/PersonCard.vue';
  import Carousel from './Carousel.vue';
  export default {
    components: {PersonCard, Carousel},
  }
</script>
  
<style scoped>
  .person-list-item {
    transition: all 0.5s ease;
    display: flex; 
    justify-content: center; 
    margin: 10px;
  }
  .person-list-enter-from,
  .person-list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
  .person-list-leave-active {
    position: absolute;
  }
</style>