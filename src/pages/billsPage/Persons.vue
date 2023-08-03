<template>

  <div style="overflow-y: auto; max-height: 75vh;">

    <modal-add-person @save="savePerson"></modal-add-person>

    <carousel-person-card></carousel-person-card>

    <div class="container">
      <div class="row" style="display: flex; align-items: center;">
        <div class="col btns">
          <img @click="leftShift" v-if="shiftCounter !== 0" src="@/img/leftArrow.png" alt="Картинка потеряна :(" width="45" height="34" class="btn btn-light d-inline-block align-text-top">
        </div>
        <div class="col btns">
          <button class="btn btn-info btn-lg" type="button" @click="addNewPerson" data-bs-toggle="modal" data-bs-target="#personModal">Добавить</button>
        </div>
        <div class="col btns">
          <img @click="rigthShift" v-if="personCounter - (shiftCounter + 1) * 3 > 0" src="@/img/rightArrow.png" alt="Картинка потеряна :(" width="45" height="34" class="btn btn-light d-inline-block align-text-top">
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import CarouselPersonCard from '@/components/carousel/CarouselPersonCard.vue';
import ModalAddPerson from '@/components/modal/ModalAddPerson.vue';
export default {
  components: { CarouselPersonCard, ModalAddPerson },
 data(){
  return{
    storePerson: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`],
    namePerson: '',
    personCounter: this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`].length === 0?0:this.$store.state.personsInfo.persons[`bill_${this.$route.params.id}`].length,
    allPerson: new Set(),
    shiftCounter: 0,
  }
 },
 methods: {
  addNewPerson(){
    for (let i in this.storePerson){
      this.allPerson.add(this.storePerson[i].name);
    }
  },
  savePerson(namePerson){
    if(namePerson !== ''){
      if(!this.allPerson.has(namePerson.toLocaleLowerCase())){
      this.allPerson.add(namePerson.toLocaleLowerCase());
      this.$store.commit('setPersonList', {array: Array.from(this.allPerson), number: this.$route.params.id - 1});
      this.$store.commit('setPersonName', [namePerson.toLocaleLowerCase(), this.$route.params.id, this.personCounter]);
      this.personCounter += 1;
      if(this.personCounter < 4){
        this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 0})
      }else if(this.$store.state.personsInfo.personListShow[`bill_${this.$route.params.id}`].length < 3){
        this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 3 * this.shiftCounter})
      }
    }else{
      alert('Пользователь с таким именем уже существует!')
      }
    }else{
      alert('Необходимо ввести имя!')
    } 
  },
  rigthShift(){
      this.shiftCounter += 1;
      this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 3 * this.shiftCounter});
    },
  leftShift(){
      this.shiftCounter -= 1;
      this.$store.commit('setShowPerson', {billNumber: this.$route.params.id, personListEl: 3 * this.shiftCounter});
    },
 }
}
</script>

<style scoped>
.btns{
  display: flex;
  justify-content: center;
}
</style>