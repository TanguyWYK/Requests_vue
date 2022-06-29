let requestBuilder = new Vue({
    el: '#requestBuilder',
    data: {
        sentenceParts: new Array(6).fill(''),
    },
    template: `<section>
                <panel1 @change-sentence="refreshSentence"></panel1>
                <panel2 @change-sentence="refreshSentence"></panel2>
                <panel3 @change-sentence="refreshSentence"></panel3>
                <panel4 @change-sentence="refreshSentence"></panel4>
                <panel5 @change-sentence="refreshSentence"></panel5>
                <panel6 @change-sentence="refreshSentence"></panel6>
                <div class="selectedRecap" >{{ sentence }}</div>
            </section>`,
    computed: {
        sentence(){
            return this.sentenceParts.join(" - ");
        }
    },

    methods: {
        refreshSentence(sentenceParts){
            Vue.set(this.sentenceParts,sentenceParts.position,sentenceParts.text);
        }
    }
});