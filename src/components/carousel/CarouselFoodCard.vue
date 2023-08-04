<template>
    <div class="carousel">
      <div class="container" style=" margin-bottom: 35px;">
        <div class="row">
          <transition-group name="food-list">
            <div class="col food-list-item" :key="food.id" v-for="food in $store.state.foodInfo.foodListShow[`bill_${this.$route.params.id}`]">
              <food-card :foodName="food.name" 
              :foodPrice="Number(food.price)" 
              :numPersonEat="food.persons.length" 
              :personList="food.persons.join(', ')"
              :whoPaid="food.paid"></food-card>
            </div>
          </transition-group>
          
        </div>
      </div>
    </div>
</template>
  
  <script>
    import FoodCard from '../card/FoodCard.vue'
    export default {
        components: { FoodCard },
    
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