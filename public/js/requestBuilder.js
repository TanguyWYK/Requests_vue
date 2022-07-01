let sentenceTable = Vue.component('sentenceTable', {
    data() {
        return {
            tableInfos: [],
            isRecieved: false,
        }
    },
    template: `<table class="" id="summaryTable">
                <thead>
                    <tr>
                        <th v-for="tableInfo in tableInfos"> {{ tableInfo[0] }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td  v-for="tableInfo in tableInfos">{{ tableInfo[1] }}</td>
                    </tr>
                    <tr>
                    <td v-for="tableInfo in tableInfos">{{ tableInfo[2] }}</td>
                    </tr>
                </tbody>
                </table>`,
    mounted() {
        this.$parent.$on('send-summary', this.refreshSentence);
        document.getElementById("summaryTable").classList.remove("hidden");
    },
    methods: {
        refreshSentence(queryMaker) {
            console.log(queryMaker);
            this.tableInfos = queryMaker.filter(val => val);
            this.isRecieved = true
        }

    },

});


let requestBuilder = new Vue({
    el: '#requestBuilder',
    components: {
        sentenceTable: sentenceTable
    },
    data: {
        sentenceParts: new Array(6).fill(''),
        queryMaker: [],
        operators: [],
        options: [],
        SummaryTable: [],
    },
    template: `<section class="recap">
                <div>
                    <panel1 @change-sentence="refreshSentence"></panel1>
                    <panel2 @change-sentence="refreshSentence"></panel2>
                    <panel3 @change-sentence="refreshSentence"></panel3>
                    <panel4 @change-sentence="refreshSentence"></panel4>
                    <panel5 @change-sentence="refreshSentence"></panel5>
                    <panel6 @change-sentence="refreshSentence"></panel6>
                </div>
                <div class="selectedRecap" id="sentenceDiv">
                    <sentenceTable></sentenceTable>
                </div>
                <button id="fillTable" @click="refreshRequestTable()">Ajouter contraintes</button>
            </section>`,
    computed: {
        sentence() {
            return this.sentenceParts.join(" - ");
        },
        drawTable() {
            return this.SummaryTable.join(" ");
        }
    },

    methods: {
        refreshSentence(sentenceParts) {
            let textElement = ["tous les polluants", "toutes les géologies", "tous les Z min", "tous les Z max", "toutes les concentrations"];
            if (sentenceParts.text[2] === null) {
                sentenceParts.text[2] = textElement[sentenceParts.position - 1];
            }
            Vue.set(this.operators, sentenceParts.position, sentenceParts.text[1]);
            Vue.set(this.options, sentenceParts.position, sentenceParts.text[2]);
            Vue.set(this.queryMaker, sentenceParts.position, sentenceParts.text);
            this.$emit('send-summary', this.queryMaker);
        },

        refreshRequestTable() {
            console.log(this.queryMaker);
        },
    }
});















