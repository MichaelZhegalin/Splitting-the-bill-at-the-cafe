<template>
  <v-app>
    <v-main class="app-backgroundImage">
      <div class="nav-margin">
        <MainNavbar/>
        <bill-navbar v-if="$route.params.billId !== undefined"/>
      </div>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import BillNavbar from "@/components/BillNavbar.vue"
import MainNavbar from './components/MainNavbar.vue'
export default {
  components: { MainNavbar, BillNavbar },

}
</script>

<style>
  @import "/src/assets/style.scss";
  .app{
    padding: 20px;
  }
  .nav-margin{
    margin-bottom: 35px;
  }
</style>
