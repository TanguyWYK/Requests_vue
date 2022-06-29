'use strict';

function initPanel(tableName, operatorButtons, selectOptions, idComponent) {

    Vue.component('panel'+idComponent, {
        data() {
            return {
                tableName: tableName,
                operatorButtons: operatorButtons,
                operatorLen: operatorButtons.length,
                selectOptions: selectOptions,
                operator: null,
                selectedOption: null,
                isSend: false,
                positionSummarySentence: idComponent-1,
            }
        },
        template: `<section>
                    <table v-if="tableName == 'Type polluant'">
                        <thead>
                        <tr>
                            <th v-bind:colspan="operatorLen">{{ tableName }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td id="checkboxes"v-bind:colspan="operatorLen"><input type="checkbox" checked disabled></td>
                        </tr>
                        <tr >
                            <td v-for="(operatorButton, index) in operatorButtons" class="operatorClass pointer-notAllowed selected" title="Non modifiable"  v-bind:id="'operator'+index">{{ operatorButton }}
                            </td>
                        </tr>
                        <tr>
                            <td v-bind:colspan="operatorLen">
                                <select class="form-control">
                                    <option selected="true" disabled="disabled" >sélectionner</option>
                                    <option v-on:click="selection($event)" v-for="selectOption in selectOptions" >{{ selectOption }}</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table v-else>
                        <thead>
                        <tr>
                            <th v-bind:colspan="operatorLen">{{ tableName }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td id="checkboxes"v-bind:colspan="operatorLen"><input type="checkbox" v-on:click="checkedCheckbox($event)"></td>
                        </tr>
                        <tr >
                            <td v-for="(operatorButton, index) in operatorButtons" class="operatorClass not-allowed" v-on:click="selectedOperator($event)"  v-bind:id="'operator'+index">{{ operatorButton }}
                            </td>
                        </tr>
                        <tr>
                            <td v-if="selectOptions  !== null" class="not-allowed"  v-bind:colspan="operatorLen">
                                <select disabled class="form-control">
                                    <option selected="true" disabled="disabled" >sélectionner</option>
                                    <option v-on:click="selection($event)" v-for="selectOption in selectOptions" >{{ selectOption }}</option>
                                </select>
                            </td>
                            <td v-else class="not-allowed" v-bind:colspan="operatorLen">
                                <input disabled type="number" step="any" placeholder="entrez une mesure"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>`,
        computed: {
            summaryText() {
                console.log(this.tableName,this.operator,this.selectedOption)
                return [this.tableName,this.operator,this.selectedOption].join(' / ');
            }
        },
        methods: {
            selectedOperator(operatorEvent) {
                operatorEvent.target.parentNode.childNodes.forEach(element => element.classList.remove("selected"));
                operatorEvent.target.classList.toggle("selected");
                this.operator = operatorEvent.target.innerText;
                this.$emit('change-sentence',{
                    text: this.summaryText,
                    position: this.positionSummarySentence
                });
            },
            checkedCheckbox(checkboxEvent) {
                if (checkboxEvent.target.checked === false) {
                    this.operator = null;
                    this.selectedOption = null;
                }
                let siblings = [checkboxEvent.target.parentNode.parentNode.nextElementSibling.childNodes,
                    checkboxEvent.target.parentNode.parentNode.nextElementSibling.nextElementSibling.childNodes];
                siblings.forEach((element, index) => {
                    element.forEach(children => {
                        children.classList.toggle("not-allowed");
                    });
                    if (index === siblings.length - 1) {
                        element[0].childNodes[0].disabled = element[0].childNodes[0].disabled === false;
                    }
                });
                this.$emit('change-sentence',{
                    text: this.summaryText,
                    position: this.positionSummarySentence
                });
            },
            selection(selectionEvent) {
                console.log(selectionEvent.target.parentNode.value);
                this.selectedOption = selectionEvent.target.parentNode.value;
                this.$emit('change-sentence',{
                    text: this.summaryText,
                    position: this.positionSummarySentence
                });
            },
        }
    });
}


