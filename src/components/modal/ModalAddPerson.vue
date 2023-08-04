<template>
    <div class="modal fade" id="personModal" tabindex="-1" aria-labelledby="personModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="personModalLabel">Введите имя человека</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-body-style">
                    <v-text-field :value="namePerson" @input="namePerson = $event.target.value" label="Имя"></v-text-field>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    <button @click="savePerson" type="button" class="btn btn-primary">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                namePerson: '',
            }
        },
        methods: {
            savePerson(){
                this.$emit('save', this.namePerson);
                this.namePerson = '';
            }
        }
    }
</script>

<style scoped>
.modal-body-style{
    display: flex;
    justify-content: center; 
    background-color: whitesmoke;
}

</style>