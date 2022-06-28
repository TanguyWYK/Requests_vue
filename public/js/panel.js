'use strict';

function initPanel(tableName, operatorButtons,measures, selectOptions, idElement){

    let panel = new Vue({
        el: '#'+idElement,
        data: {
            tableName: tableName,
            measures: measures,
            counter: 0,
            lastCounter: 10,
            operatorButtons: operatorButtons,
            isActive: false,
            selectOptions: selectOptions,
            operator: null,
        },
        template: `<section>
                    <table>
                        <thead>
                        <tr>
                            <th colspan="2">{{ tableName }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td id="checkboxes" colspan="2"><input type="checkbox" checked></td>
                        </tr>
                        <tr >
                            <td v-for="(operatorButton, index) in operatorButtons" class="operatorClass" v-on:click="selectedOperator($event)"  v-bind:id="'operator'+index">{{ operatorButton }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <select class="form-control">
                                    <option v-for="selectOption in selectOptions" >{{ selectOption }}</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button v-on:click="changeMeasures">Clic</button>
                </section>`,
        computed: {
            sum: function () {
                return this.counter + this.lastCounter;
            }
        },
        methods: {
            changeMeasures() {
                this.counter++;
                //Vue.set(this.measures,1,this.measures[1]+1);
            },
            selectedOperator(event){
                //this.isActive = !this.isActive;
                console.log(event.target);
                console.log(event.target.parentNode.childNodes);
                event.target.parentNode.childNodes.forEach(element => element.classList.remove("selected"));
                event.target.classList.toggle("selected");
                this.operator = event.target.innerText;
                console.log(this.operator);
            }
        },
    });





}


