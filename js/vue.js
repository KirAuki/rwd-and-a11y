const app = Vue.createApp ({
    data(){
        return {
            notes:[],
            inputNote:'',
            charCount: 0 ,
            btnDisabled: true,
        }
    },
    methods: {
        checkNote() {
            if(this.inputNote != "" && this.inputNote.length <= 144){
                this.charCount = this.inputNote.length;
                this.btnDisabled = false;
            } else {
                this.charCount = this.inputNote.length;
                this.btnDisabled = true;
            }
            
        },
        createNote(){
            if (this.inputNote != "") {
                this.notes.push({
                    note: this.inputNote,
                    date: new Intl.DateTimeFormat('ru', {
                        year: "numeric", 
                        month: "numeric",
                         day: "numeric", 
                         hour: "numeric", 
                         minute: "numeric",
                        }).format(Date.now()),
                    })
                }
            this.btnDisabled = true
            this.inputNote = '';
            this.charCount = 0
        },
        deleteNote(note){
            this.notes.splice(this.notes.indexOf(note), 1);
        }
    },
    computed: {
        notesCount() {
            return this.notes.length;
        }
    }
});


const vm = app.mount('#app')
