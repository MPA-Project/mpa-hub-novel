import { defineStore} from 'pinia'

export const useStores = defineStore('store', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      loadingState: true,
    }
  },
  actions:{
    toggleLoadingState(){
      this.loadingState = !this.loadingState
    },
  },

})