let summaryTable = Vue.component('summaryTable', {
    data() {
        return {
            brutTable: [],
            eluateTable: [],
            airTable: [],
            waterTable: [],
            querySum: null,

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
                        <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                        <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        <span v-if="brutElements[i]">{{ brutElements[i][1]+brutElements[i][2] }}</span>
                        <span v-else>-</span>
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
                    <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                    <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                        <select name="operator" id="operator-select">
                        <option value="">Et</option>
                        <option value="">Ou</option>
                        </select>
                    </div>
                    <span v-if="eluateElements[i]">{{ eluateElements[i][1]+eluateElements[i][2] }}</span>
                    <span v-else>-</span>
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
                        <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                        <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        <span v-if="waterElements[i]">{{ waterElements[i][1]+waterElements[i][2] }}</span>
                        <span v-else>-</span>
                        </td>
                    </tr>
                    <tr v-if="airTable.length" v-for="(airElements,elementNum) in airTable">
                        <td v-if="elementNum < 1" :rowspan="airTable.length" class="relative">air</td>
                        <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                        <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                            <select name="operator" id="operator-select">
                            <option value="">Et</option>
                            <option value="">Ou</option>
                            </select>
                        </div>
                        <span v-if="airElements[i]">{{ airElements[i][1]+airElements[i][2] }}</span>
                        <span v-else>-</span>
                        </td>
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
            removeButton.target.parentNode.parentNode.closest('tr').remove();
        }
    },

});


/**
 * <td @click="removeLine($event)" class="remove">
                            <div class="removeDiv">
                                <span class="removeButton"></span>
                            </div>
                        </td>
 */