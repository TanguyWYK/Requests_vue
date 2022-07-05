let summaryTable = Vue.component('summaryTable', {
    data() {
        return {
            brutTable: [],
            eluateTable: [],
            airTable: [],
            waterTable: [],
        }
    },
    template: `<table :class="showSummary">
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
                        <td v-if="elementNum < 1" :rowspan="brutTable.length">Sol brut</td>
                        <td v-if="index > 0" v-for="(brut,index) in brutElements">{{ brut[1]+brut[2] }}</td>
                    </tr>
                    <tr v-if="eluateTable.length" v-for="(eluateElements,elementNum) in eluateTable">
                        <td v-if="elementNum < 1" :rowspan="eluateTable.length">Sol eluat</td>
                        <td v-if="index > 0" v-for="(eluate,index) in eluateElements">{{ eluate[1]+eluate[2] }}</td>
                    </tr>
                    <tr v-if="waterTable.length" v-for="(waterElements,elementNum) in waterTable">
                        <td v-if="elementNum < 1" :rowspan="waterTable.length">eau</td>
                        <td v-if="index > 0" v-for="(water,index) in waterElements">{{ water[1]+water[2] }}</td>
                    </tr>
                    <tr v-if="airTable.length" v-for="(airElements,elementNum) in airTable">
                        <td v-if="elementNum < 1" :rowspan="airTable.length">air</td>
                        <td v-if="index > 0" v-for="(air,index) in airElements">{{ air[1]+air[2] }}</td>
                    </tr>
                </tbody>
                </table>`,
    computed: {
        showSummary(){
            let querySum = this.brutTable.length+this.eluateTable.length+this.waterTable.length+this.airTable.length;
            return querySum === 0 ? "hidden" : ""; 
        }
    },
    mounted() {
        this.$parent.$on('send-summary', this.refreshTable);
    },
    methods: {
        refreshTable(queryMaker) {
            console.log(queryMaker);
            if(queryMaker[0][2] === "Sol brut"){
                this.brutTable.push(queryMaker);
            }
            else if(queryMaker[0][2] === "Sol eluat"){
                this.eluateTable.push(queryMaker);
            }
            else if(queryMaker[0][2] === "air"){
                this.airTable.push(queryMaker);
            }
            else{
                this.waterTable.push(queryMaker);
            }
            console.log("brut:",this.brutTable);
            console.log("eluate:",this.eluateTable);
            console.log("water:",this.waterTable);
            console.log("air:",this.airTable);
        }


    },

});