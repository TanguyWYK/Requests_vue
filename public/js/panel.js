'use strict';

function initPanel(operatorButtons,measures,idElement){

    let panel = new Vue({
        el: '#'+idElement,
        data: {
            measures: measures,
            counter: 0,
            lastCounter: 10,
            operatorButtons: operatorButtons,
        },
        template: `<section>
                    <table>
                      <tr>
                        <th>Mesure</th>
                      </tr>
                      <tr v-for="measure in measures">
                        <td>{{ measure }}</td>
                      </tr>
                      <tr><td>{{ counter }}</td></tr>
                      <tr><td>{{ sum }}</td></tr>
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
            }
        },
    });





}


