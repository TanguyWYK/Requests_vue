'use strict';
let pollutantsInfo = [];
let geologiesInfo = [];
for (let pollutant of POLLUTANTS) {
    pollutantsInfo.push({
        name: pollutant.name_fr,
        id: pollutant.id,
        custom: pollutant.custom
    })
}

for (let geology of GEOLOGIES) {
    geologiesInfo.push({
        name: geology.name_fr,
        id: geology.id,
        custom: geology.custom
    })
}


initPanel("Type polluant", ["="], ["Sol brut", "Sol eluat", "eau", "air"], 1);
initPanel("Nom polluant", ["=", "≠"], pollutantsInfo, 2);
initPanel("géologie", ["=", "≠"], geologiesInfo, 3);
initPanel("Z min", ["⩾", "⩽", ">", "<", "=", "≠"], null, 4);
initPanel("Z max", ["⩾", "⩽", ">", "<", "=", "≠"], null, 5);
initPanel("Concentration", ["⩾", "⩽", ">", "<", "=", "≠"], null, 6);
