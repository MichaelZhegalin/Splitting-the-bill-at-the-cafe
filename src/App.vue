<template>
  <div>
    <div style="margin-bottom: 35px;">
      <main-navbar></main-navbar>
      <bill-navbar v-if="$route.params.id !== undefined"></bill-navbar>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import BillNavbar from "@/components/BillNavbar.vue"
import MainNavbar from './components/MainNavbar.vue'
export default {
  components: { MainNavbar, BillNavbar },

}
</script>

<style>
  .app{
    padding: 20px;
  }
</style>