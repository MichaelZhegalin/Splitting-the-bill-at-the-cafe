<template>
  <v-app>
    <v-main class="testbody">
      <div style="margin-bottom: 35px;">
        <main-navbar></main-navbar>
        <bill-navbar v-if="$route.params.id !== undefined"></bill-navbar>
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
</style>
