let summaryTable = Vue.component('summaryTable', {
    data() {
        return {
            brutTable: [],
            eluateTable: [],
            airTable: [],
            waterTable: [],
            querySum: null,
            typesCounter: 0,
            brutExist: 0,
            eluateExist: 0,
            waterExist: 0,
            airExist: 0,
        }
    },
    template: `<table id="summary" :class="showSummary" countTypes>
                <thead>
                    <tr>
                    <th v-if="typesCounter > 1" id="bgChanger"></th>
                    <th>Type Polluant</th>
                    <th>Nom Polluant</th>
                    <th>Géologie</th>
                    <th>Z min</th>
                    <th>Z max</th>
                    <th>Concentration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="brutTable.length" v-for="(brutElements,elementNum) in brutTable">
                        <td v-if="elementNum < 1 & typesCounter > 1" :rowspan="brutTable.length" class="selectEtOu">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </td>
                        <td v-if="elementNum < 1" :rowspan="brutTable.length">Sol brut</td>
                        <td v-if="index > 0" v-for="(brut,index) in brutElements">{{ brut[1]+brut[2] }}</td>
                    </tr>
                    <tr v-if="eluateTable.length" v-for="(eluateElements,elementNum) in eluateTable">
                        <td  v-if="elementNum < 1 & typesCounter > 1" :rowspan="eluateTable.length" class="selectEtOu">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </td>
                        <td v-if="elementNum < 1" :rowspan="eluateTable.length">Sol eluat</td>
                        <td v-if="index > 0" v-for="(eluate,index) in eluateElements">{{ eluate[1]+eluate[2] }}</td>
                    </tr>
                    <tr v-if="waterTable.length" v-for="(waterElements,elementNum) in waterTable">
                        <td v-if="elementNum < 1 & typesCounter > 1" :rowspan="waterTable.length" class="selectEtOu">
                        <select name="operator" id="operator-select">
                        <option value="">Et</option>
                        <option value="">Ou</option>
                        </select>
                        </td>
                        <td v-if="elementNum < 1" :rowspan="waterTable.length">eau</td>
                        <td v-if="index > 0" v-for="(water,index) in waterElements">{{ water[1]+water[2] }}</td>
                    </tr>
                    <tr v-if="airTable.length" v-for="(airElements,elementNum) in airTable">
                        <td v-if="elementNum < 1 & typesCounter > 1" :rowspan="airTable.length" class="selectEtOu">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </td>
                        <td v-if="elementNum < 1" :rowspan="airTable.length">air</td>
                        <td v-if="index > 0" v-for="(air,index) in airElements">{{ air[1]+air[2] }}</td>
                    </tr>
                </tbody>
                </table>`,
    computed: {
        showSummary(){
            this.querySum = this.brutTable.length+this.eluateTable.length+this.waterTable.length+this.airTable.length;
            return this.querySum === 0 ? "hidden" : ""; 
        },
        
    },
    mounted() {
        this.$parent.$on('send-summary', this.refreshTable);
    },
    methods: {
        refreshTable(queryMaker) {
            if(queryMaker[0][2] === "Sol brut"){
                this.brutTable.push(queryMaker);
                if(this.typesCounter <= 1 & this.brutExist === 0){
                    this.typesCounter += 1;
                }
                this.brutExist = 1;
            }
            else if(queryMaker[0][2] === "Sol eluat"){
                this.eluateTable.push(queryMaker);
                if(this.typesCounter <= 1 & this.eluateExist === 0){
                    this.typesCounter += 1;
                }
                this.eluateExist = 1;
            }
            else if(queryMaker[0][2] === "air"){
                this.airTable.push(queryMaker);
                if(this.typesCounter <= 1 & this.airExist === 0){
                    this.typesCounter += 1;
                }
                this.airExist = 1;
            }
            else{
                this.waterTable.push(queryMaker);
                if(this.typesCounter <= 1 & this.waterExist === 0){
                    this.typesCounter += 1;
                }
                this.waterExist = 1;
            }
        }


    },

});