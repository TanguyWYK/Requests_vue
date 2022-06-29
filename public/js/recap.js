let recap = new Vue({
    el: '#selectionRecap',
    data: {
        pollutant: null,
    },
    template: `<section>
                <div :pollutant="pollutant" class="selectedRecap" @changed="printPollutant()"  >ici</div>
            </section>`,
    computed: {
        
    },
    methods: {
        printPollutant(selected){
            this.pollutant = selected;
            console.log(this.pollutant);
        }
    }
});