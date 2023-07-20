<template>
  <div @click="$router.push('/')" class="navbar">Какая-то менюшка</div>
</template>

<script>

export default {

}
</script>

<style scoped>
.navbar{
    display: flex;
    align-items: center;
    background-color: lightsalmon;
    padding: 15px;
}
</style>