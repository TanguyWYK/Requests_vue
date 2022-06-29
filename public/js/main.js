'use strict';
let pollutantsName = [];
let geologiesNames = [];
for(let pollutant of POLLUTANTS){
    pollutantsName.push(pollutant.name_fr)
}

for(let geology of GEOLOGIES){
    geologiesNames.push(geology.name_fr)
}


initPanel("Type polluant", ["="],[1,1,1,2,3],["Sol brut", "Sol eluat", "eau", "air"],'panel1');
initPanel("Nom polluant", ["=", "≠"],[1,1,1,2,3],pollutantsName,'panel2');
initPanel("géologie", ["=", "≠"],[1,1,1,2,3],geologiesNames,'panel3');
initPanel("Z min", ["=", "≠", "<", ">", "⩽", "⩾"],[1,1,1,2,3],null,'panel4');
initPanel("Z max", ["=", "≠", "<", ">", "⩽", "⩾"],[1,1,1,2,3],null,'panel5');
initPanel("Concentration", ["=", "≠", "<", ">", "⩽", "⩾"],[1,1,1,2,3],null,'panel6');
