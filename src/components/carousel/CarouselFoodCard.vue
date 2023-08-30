<template>
  <carousel>
    <transition-group name="food-list">
      <div 
        class="col food-list-item" 
        :key="food.id" 
        v-for="food in $store.state.foodInfo.foodListShow[`bill_${this.$route.params.billId}`]"
      >
        <food-card 
          :foodName="food.name" 
          :foodPrice="Number(food.price)" 
          :numPersonEat="food.persons.length" 
          :personList="food.persons.join(', ')"
          :whoPaid="food.paid"
        />
      </div>
    </transition-group>
  </carousel>
</template>
  
  <script>
    import FoodCard from '../card/FoodCard.vue'
    import Carousel from './Carousel.vue'
    export default {
        components: {FoodCard, Carousel},
    }
  </script>
  
<style scoped>
  .food-list-item {
    transition: all 0.5s ease;
    display: flex; 
    justify-content: center; 
    margin: 10px;
  }
  .food-list-enter-from,
  .food-list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  } 
  .food-list-leave-active {
    position: absolute;
  }
</style>