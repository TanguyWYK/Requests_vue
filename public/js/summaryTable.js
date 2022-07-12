let summaryTable = Vue.component('summaryTable', {
    data() {
        return {
            brutTable: [],
            eluateTable: [],
            airTable: [],
            waterTable: [],
            querySum: null,
            typesCounter: 0,

        }
    },
    template: `<table id="summary" :class="showSummary" countTypes>
                <thead>
                    <tr>
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
                        <td v-if="elementNum < 1" :rowspan="brutTable.length" class="relative">
                            <div v-if=" eluateTable.length > 0 || airTable.length > 0 || waterTable.length > 0" class="selectEtOu">
                                <select name="operator" id="operator-select">
                                <option value="">Et</option>
                                <option value="">Ou</option>
                                </select>
                            </div>
                        Sol brut</td>
                        <td v-if="index > 0" v-for="(brut,index) in brutElements" class="relative">
                        <div v-if=" elementNum > 0" class="elementSelector">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        {{ brut[1]+brut[2] }}
                        </td>
                        <td @click="removeLine($event)" class="remove">
                            <div class="removeDiv">
                                <span class="removeButton"></span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="eluateTable.length" v-for="(eluateElements,elementNum) in eluateTable">
                        <td v-if="elementNum < 1" :rowspan="eluateTable.length" class="relative">
                        <div v-if=" airTable.length > 0 || waterTable.length > 0" class="selectEtOu">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                    Sol eluat</td>
                        <td v-if="index > 0" v-for="(eluate,index) in eluateElements">
                        <div v-if=" index > 1" class="">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        {{ eluate[1]+eluate[2] }}
                        </td>
                    </tr>
                    <tr v-if="waterTable.length" v-for="(waterElements,elementNum) in waterTable">
                        <td v-if="elementNum < 1" :rowspan="waterTable.length" class="relative">
                        <div v-if=" airTable.length > 0" class="selectEtOu">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        eau</td>
                        <td v-if="index > 0" v-for="(water,index) in waterElements">
                        <div v-if=" index > 1" class="">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        {{ water[1]+water[2] }}
                        </td>
                    </tr>
                    <tr v-if="airTable.length" v-for="(airElements,elementNum) in airTable">
                        <td v-if="elementNum < 1" :rowspan="airTable.length" class="relative">air</td>
                        <td v-if="index > 0" v-for="(air,index) in airElements">
                        <div v-if=" index > 1" class="">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        {{ air[1]+air[2] }}</td>
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

            queryMaker = {...queryMaker}
            if(queryMaker[0][2] === "Sol brut"){
                this.brutTable.push(queryMaker);
                console.log(this.brutTable[0]);
            }
            else if(queryMaker[0][2] === "Sol eluat"){
                this.eluateTable.push(queryMaker);
            }
            else if(queryMaker[0][2] === "air"){
                this.airTable.push(queryMaker);
            }
            else if(queryMaker[0][2] === "eau"){
                this.waterTable.push(queryMaker);
            }
        },

        removeLine(removeButton){
            console.log(removeButton.target.parentNode.parentNode.closest('tr'));
            removeButton.target.parentNode.parentNode.closest('tr').remove();
        }
    },

});