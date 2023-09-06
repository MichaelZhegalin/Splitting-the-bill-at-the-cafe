<template>
  <div class="persons-size persons-overflow">
    <modal-add-person @save="savePerson" v-model="isShowModalProp"/>
    <carousel-person-card/>
    <div class="container">
      <div class="row row-internal-position">
        <div class="col btns">
          <v-btn @click="leftShift" v-if="shiftCounter !== 0">
            <v-img 
              :src="require('/src/img/leftArrow.png')" 
              alt="Картинка потеряна :(" 
              width="35" 
              height="24"
            />
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn 
            size="large" 
            color="#0DCAF0" 
            @click="addNewPerson" 
          >
            Добавить
          </v-btn>
        </div>
        <div class="col btns">
          <v-btn  @click="rightShift" v-if="personCounter - (shiftCounter + 1) * 3 > 0">
            <v-img 
              :src="require('/src/img/rightArrow.png')"  
              alt="Картинка потеряна :(" 
              width="35" 
              height="24"
            />
          </v-btn>
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
        storePerson: this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`],
        namePerson: '',
        personCounter: 
          this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`].length === 0
          ? 0
          : this.$store.state.personsInfo.persons[`bill_${this.$route.params.billId}`].length,
        allPerson: new Set(),
        shiftCounter: 0,
        isShowModalProp: false
      }
    },
    methods: {
      addNewPerson(){
        this.isShowModalProp = true;
        for (let i in this.storePerson){
          this.allPerson.add(this.storePerson[i].name);
        }
      },
      savePerson(namePerson){
        if (namePerson !== ''){
          if (!this.allPerson.has(namePerson.toLocaleLowerCase())){
          this.allPerson.add(namePerson.toLocaleLowerCase());
          this.$store.commit('setPersonList', {array: Array.from(this.allPerson), number: this.$route.params.billId - 1});
          this.$store.commit('setPersonName', [namePerson.toLocaleLowerCase(), this.$route.params.billId, this.personCounter]);
          this.personCounter += 1;
          if (this.personCounter < 4){
            this.$store.commit('setShowPerson', {billNumber: this.$route.params.billId, personListEl: 0});
          } else if (this.$store.state.personsInfo.personListShow[`bill_${this.$route.params.billId}`].length < 3){
            this.$store.commit('setShowPerson', {billNumber: this.$route.params.billId, personListEl: 3 * this.shiftCounter});
          }
        } else{
          alert('Пользователь с таким именем уже существует!');
          }
        } else{
          alert('Необходимо ввести имя!');
        } 
      },
      rightShift(){
          this.shiftCounter += 1;
          this.$store.commit('setShowPerson', {billNumber: this.$route.params.billId, personListEl: 3 * this.shiftCounter});
        },
      leftShift(){
          this.shiftCounter -= 1;
          this.$store.commit('setShowPerson', {billNumber: this.$route.params.billId, personListEl: 3 * this.shiftCounter});
        },
    }
  }
</script>

<style scoped>
  .row-internal-position{
    display: flex; 
    align-items: center;
  }
  .persons-size{
    max-height: 75vh;
  }
  .persons-overflow{
    overflow-y: auto;
  }
  .btns{
    display: flex;
    justify-content: center;
  }
</style>