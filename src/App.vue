<template>
 <main-navbar></main-navbar>
 <bill-navbar></bill-navbar>
 <router-view></router-view>
</template>

<script>
import BillNavbar from "@/components/BillNavbar.vue"
import MainNavbar from './components/MainNavbar.vue'
export default {
  components: { MainNavbar, BillNavbar },

}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .app{
    padding: 20px;
  }
</style>