<template>
    <div class="billNavbar">
        <div @click="$router.push(`/bill/${$route.params.id}`)">Менюшка</div>
        <div class="btns">
            <button @click="$router.push(`/bill/${$route.params.id}/persons`)">Люди</button>
            <button @click="$router.push(`/bill/${$route.params.id}/food`)">Еда</button>
            <button @click="$router.push(`/bill/${$route.params.id}/splitCheck`)">Счет</button>
        </div>
    </div>
  
</template>

<script>

export default {

}
</script>

<style scoped>
.billNavbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    width: 40vw;
    margin: auto;
}

.btns{
    display: flex;
    gap: 10px;
}
</style>