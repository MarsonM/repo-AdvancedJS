Vue.component('errorcomp', {
    data() {
        return {
            errorText: ''
        }
    },

    computed: {
        visible() {
            return this.errorText !== ''
        }
    },

    methods: {
      showError(error){
          this.errorText = error
      }
    },
        
    template: `
                <div class="errorDiv" v-if="visible">
                    <div class="errText">
                        <button class="closeBtn" @click="showError('')">
                            close
                        </button>
                        {{errorText}}
                    </div>
                </div>
            `
})