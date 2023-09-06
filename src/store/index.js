import { createStore } from 'vuex'
import { personsInfoModule } from './personsInfoModule'
import { foodInfoModule } from './foodInfoModule'

export default createStore({
  modules: {
    personsInfo: personsInfoModule,
    foodInfo: foodInfoModule
  }
})