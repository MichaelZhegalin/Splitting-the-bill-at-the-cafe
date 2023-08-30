<template>
    <v-dialog v-model="show" transition="dialog-top-transition" width="20rem">
        <v-card class="card-padding">
            <v-toolbar color="info" title="Введите имя человека"/>
            <v-form @submit.prevent>
                <v-text-field
                    :value="namePerson" 
                    @input="namePerson = $event.target.value"
                    :rules="rules"
                    label="Имя"
                    variant="underlined"
                />
                <v-btn 
                    @click="savePerson" 
                    type="submit" 
                    block 
                    class="mt-2 text-white btn-color"
                >
                    Сохранить
                </v-btn>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            showModal: Boolean,
        },
        data(){
            return{
                namePerson: '',
                rules: [
                    value =>{
                        if (value){
                            return true
                        } 
                        return 'Необходимо ввести имя человека'
                    }
                ],
            }
        },
        methods: {
            savePerson(){
                this.$emit('save', this.namePerson);
                this.namePerson = '';
            }
        },
        computed: {
            show: {
                get(){
                    return this.showModal;
                },
                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style scoped>
    .card-padding{
        padding: 15px;
    }
    .btn-color{
        background-color: forestgreen;
    }
</style>