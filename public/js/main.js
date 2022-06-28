'use strict';
let pollutantsName = [];
for(let pollutant of POLLUTANTS){
    pollutantsName.push(pollutant.name_fr)
}
initPanel("Type polluant", ["="],[1,1,1,2,3],["Sol brut", "Sol eluat", "eau", "air"],'panel1');
initPanel("Nom polluant", ["=", "≠"],[1,1,1,2,3],pollutantsName,'panel2');
//initPanel([],[2,2,2],'panel2');
//console.log(POLLUTANTS);
