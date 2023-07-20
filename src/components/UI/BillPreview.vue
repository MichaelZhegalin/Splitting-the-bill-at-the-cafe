<template>
  <div @click="$router.push('/bill/1')" class="billPreview">Блок со счетом</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.billPreview{
    height: 150px;
    width: 150px;
    background-color: forestgreen;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>