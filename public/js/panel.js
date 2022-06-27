'use strict';

let panel = new Vue({
    el: '#panel',
    data: {
        measures: [1, 2, 3],
    },
    template: `<section>
                    <table>
                      <tr>
                        <th>Mesure</th>
                      </tr>
                      <tr v-for="measure in measures">
                        <td>{{ measure }}</td>
                      </tr>
                    </table>
                    <button v-on:click="changeMeasures">Clic</button>
                </section>`,
    computed: {},
    methods: {
        changeMeasures(){
            Vue.set(this.measures,1,this.measures[1]+1);
        }
    },
});