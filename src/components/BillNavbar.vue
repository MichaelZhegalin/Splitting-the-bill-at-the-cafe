<template>
    <div class="billNavbar">
        <nav class="navbar navbar-style">
            <div class="container-fluid">
                <div class="row" style="display: flex; align-items: center;">
                    <div class="col">
                        <div class="navbar-brand" @click="goToBillInfo">Общая информация</div>
                    </div>
                    <div class="col">
                        <button class="nav-link" @click="goToPersons">Люди</button>
                    </div>
                    <div class="col">
                        <button class="nav-link" @click="goToFood">Еда</button>
                    </div>
                    <div class="col">
                        <button class="nav-link" @click="goToSplitCheck">Счет</button>
                    </div>
                </div>    
            </div>
        </nav>
    </div>
  
</template>

<script>

export default {
    methods: {
        goToBillInfo(){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
            this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 0})
            this.$router.push(`/bill/${this.$route.params.id}`)
        },
        goToPersons(){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
            this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 0})
            this.$router.push(`/bill/${this.$route.params.id}/persons`)
        },
        goToFood(){
            if(this.$store.state.personsInfo.personList[this.$route.params.id - 1] !== undefined){
                this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
                this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 0})
                this.$router.push(`/bill/${this.$route.params.id}/food`)
            }else{
                alert("Необходимо добавить хотя бы одного человека!")
            } 
        },
        goToSplitCheck(){
            this.$store.commit('setShowFood', {billNumber: this.$route.params.id, foodListEl: 0})
            this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 0})
            this.$router.push(`/bill/${this.$route.params.id}/splitCheck`)
        },

    }

}
</script>

<style scoped>

.navbar-style{
    background-color: #DEDAD6;
    border-radius: 0 0 15px 15px;
}

.navbar-brand:hover{
    cursor: pointer;
    transition: 350ms;
    color: olivedrab;
}

.nav-link:hover{
    color: orangered;
}

.billNavbar{
    display: flex;
    justify-content: center;
}
</style>