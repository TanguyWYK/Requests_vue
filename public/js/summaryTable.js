let summaryTable = Vue.component('summaryTable', {
    data() {
        return {
            brutTable: [],
            eluateTable: [],
            airTable: [],
            waterTable: [],
            brutOperator: [],
            eluateOperator: [],
            waterOperator: [],
            airOperator: [],
            querySum: null,
            generalOperators: ["OR","OR","OR"],
            listRequest: {
                pollutants_soil: {
                }, 
                pollutants_soil_eluate: {
                },
                pollutants_water: {
                }, 
                pollutants_air: {
                },
                booleanOperators: [], 
            },
            pollutants_soil: {
                constrains: [],
                booleanOperators: [],
            }, 
            pollutants_soil_eluate: {
                constrains: [],
                booleanOperators: [],
            },
            pollutants_water: {
                constrains: [],
                booleanOperators: [],
            }, 
            pollutants_air: {
                constrains: [],
                booleanOperators: [],
            }, 

        }
    },
    template: `<section>
                <table id="summary" :class="showSummary" countTypes>
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
                                <select name="operator" id="operator-select" @change="fillGeneralOperators($event, 0)">
                                <option selected="true" disabled="disabled" >et/ou</option>
                                <option value="AND">Et</option>
                                <option value="OR">Ou</option>
                                </select>
                            </div>
                        Sol brut</td>
                        <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                        <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                            <select name="operator" id="operator-select" @change="fillOperators($event, 'brut')">
                            <option selected="true" disabled="disabled" >et/ou</option>
                            <option value="AND">Et</option>
                            <option value="OR">Ou</option>
                            </select>
                        </div>
                        <span v-if="brutElements[i]">{{ brutElements[i][1]+brutElements[i][2] }}</span>
                        <span v-else>-</span>
                        </td>
                        
                    </tr>
                    <tr v-if="eluateTable.length" v-for="(eluateElements,elementNum) in eluateTable">
                        <td v-if="elementNum < 1" :rowspan="eluateTable.length" class="relative">
                        <div v-if=" airTable.length > 0 || waterTable.length > 0" class="selectEtOu">
                            <select name="operator" id="operator-select" @change="fillGeneralOperators($event, 1)">
                            <option selected="true" disabled="disabled" >et/ou</option>
                            <option value="AND">Et</option>
                            <option value="OR">Ou</option>
                            </select>
                        </div>
                        Sol eluat</td>
                    <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                    <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                        <select name="operator" id="operator-select" @change="fillOperators($event, 'eluate')">
                        <option selected="true" disabled="disabled" >et/ou</option>
                        <option value="AND">Et</option>
                        <option value="OR">Ou</option>
                        </select>
                    </div>
                    <span v-if="eluateElements[i]">{{ eluateElements[i][1]+eluateElements[i][2] }}</span>
                    <span v-else>-</span>
                    </td>
                    </tr>
                    <tr v-if="waterTable.length" v-for="(waterElements,elementNum) in waterTable">
                        <td v-if="elementNum < 1" :rowspan="waterTable.length" class="relative">
                        <div v-if=" airTable.length > 0" class="selectEtOu">
                            <select name="operator" id="operator-select" @change="fillGeneralOperators($event, 2)">
                            <option selected="true" disabled="disabled" >et/ou</option>
                            <option value="AND">Et</option>
                            <option value="OR">Ou</option>
                            </select>
                        </div>
                        eau</td>
                        <td v-if="i > 0" v-for="i in 5" class="relative" :class="i == 1 ? 'paddingLeft' : '' ">
                        <div v-if=" elementNum > 0 && i === 1" class="elementSelector">
                            <select name="operator" id="operator-select" @change="fillOperators($event, 'water')">
                            <option selected="true" disabled="disabled" >et/ou</option>
                            <option value="AND">Et</option>
                            <option value="OR">Ou</option>
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
                            <select name="operator" id="operator-select" @change="fillOperators($event, 'air')">
                            <option selected="true" disabled="disabled" >et/ou</option>
                            <option value="AND">Et</option>
                            <option value="OR">Ou</option>
                            </select>
                        </div>
                        <span v-if="airElements[i]">{{ airElements[i][1]+airElements[i][2] }}</span>
                        <span v-else>-</span>
                        </td>
                    </tr>
                </tbody>
                </table>
                <button id="queryButton" class="hidden" @click="makeQuery()">Voir les résultats</button>
                </section>`,
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
        },

        makeQuery(){
            this.brutTable.forEach((element,index) => {
                this.pollutants_soil.constrains[index] = fill_of_null();
                this.pollutants_soil.constrains[index] = fillQuery(this.pollutants_soil.constrains[index], element);
                this.pollutants_soil.booleanOperators = this.brutOperator;
            });
            this.eluateTable.forEach((element,index) => {
                this.pollutants_soil_eluate.constrains[index] = fill_of_null();
                this.pollutants_soil_eluate.constrains[index] = fillQuery(this.pollutants_soil_eluate.constrains[index], element);
                this.pollutants_soil_eluate.booleanOperators = this.eluateOperator;
            });
            this.waterTable.forEach((element,index) => {
                this.pollutants_water.constrains[index] = fill_of_null();
                this.pollutants_water.constrains[index] = fillQuery(this.pollutants_water.constrains[index], element);
                this.pollutants_water.booleanOperators = this.waterOperator;
            });
            this.airTable.forEach((element,index) => {
                this.pollutants_air.constrains[index] = fill_of_null();
                this.pollutants_air.constrains[index] = fillQuery(this.pollutants_air.constrains[index], element);
                this.pollutants_air.booleanOperators = this.airOperator;
            });
            this.listRequest.pollutants_soil = this.pollutants_soil;
            this.listRequest.pollutants_soil_eluate = this.pollutants_soil_eluate;
            this.listRequest.pollutants_water = this.pollutants_water;
            this.listRequest.pollutants_air = this.pollutants_air;
            this.listRequest.booleanOperators = this.generalOperators;
            console.log(this.listRequest);
            },
        
            fillOperators(event, type){
                if(type === "brut"){
                    this.brutOperator.push(event.target.value);
                }
                else if(type === "eluate"){
                    this.eluateOperator.push(event.target.value);
                }
                else if(type === "water"){
                    this.waterOperator.push(event.target.value);
                }
                else if(type === "air"){
                    this.airOperator.push(event.target.value);
                }
            },

            fillGeneralOperators(event, pos){
                this.generalOperators[pos] = event.target.value;
                this.generalOperators = this.generalOperators.filter(val => val);
            }
    },

});

function fill_of_null(){
    return constrains = {
        pollutantId: null,
        pollutantCustom: null,
        operator_pollutant: null,
        concentration: null,
        operator_concentration: null,
        geologyId: null,
        geologyCustom: null,
        operator_geology: null,
        zMin: null,
        operator_zMin: null,
        zMax: null,
        operator_zMax: null,
    }
}


function fillQuery(typeObject, element){
    if(element[1]){
        typeObject.pollutantId = element[1][3];
        typeObject.pollutantCustom = element[1][4];
        typeObject.operator_pollutant = element[1][1];
    }
    if(element[2]){
        typeObject.geologyId = element[2][3];
        typeObject.geologyCustom = element[2][4];
        typeObject.operator_geology = element[2][1];
    }
    if(element[3] && element[3][2] != "tous les Z min"){
        typeObject.zMin = element[3][2];
        typeObject.operator_zMin = element[3][1];
    }
    if(element[4] && element[4][2] != "tous les Z max" ){
        typeObject.zMax = element[4][2];
        typeObject.operator_zMax = element[4][1];
    }
    if(element[5] && element[5][2] != "toutes les concentrations"){
        typeObject.concentration = element[5][2];
        typeObject.operator_concentration = element[5][1];
    }
    return typeObject;
}


/**
 * <td @click="removeLine($event)" class="remove">
                            <div class="removeDiv">
                                <span class="removeButton"></span>
                            </div>
                        </td>
 */