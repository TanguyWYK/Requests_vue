'use strict';
let pollutantsName = [];
let geologiesNames = [];
for (let pollutant of POLLUTANTS) {
    pollutantsName.push(pollutant.name_fr)
}

for (let geology of GEOLOGIES) {
    geologiesNames.push(geology.name_fr)
}


initPanel("Type polluant", ["="], ["Sol brut", "Sol eluat", "eau", "air"], 1);
initPanel("Nom polluant", ["=", "≠"], pollutantsName, 2);
initPanel("géologie", ["=", "≠"], geologiesNames, 3);
initPanel("Z min", ["⩾", "⩽", ">", "<", "=", "≠"], null, 4);
initPanel("Z max", ["⩾", "⩽", ">", "<", "=", "≠"], null, 5);
initPanel("Concentration", ["⩾", "⩽", ">", "<", "=", "≠"], null, 6);
