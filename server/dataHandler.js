const xlsxFile = require('read-excel-file/node');
function handleEpiKurve(filename, sheetname) {
    xlsxFile(`./files/${filename}`,{ sheet: sheetname }).then((rows) => {
        let data = [];
        let dataObject = {};
        for (i in rows){
            dataObject = new Object();
            for (j in rows[i]){
                if(i>3){
                    if(j==0){
                        dataObject.date=rows[i][j];
                    }
                    else{
                        dataObject.cases=rows[i][j];
                        data.push(dataObject);
                    }
                }
            }        
        }
        console.log(data);
    })
}

function handleAltersVerteilung(filename, sheetname) {
    xlsxFile(`./files/${filename}`,{ sheet: sheetname }).then((rows) => {
        let data = [];
        let dataObject = {};
        for (i in rows){
            dataObject = new Object();
            for (j in rows[i]){
                if(i>=5 && i<=13){
                    switch (j) {
                        case "0":
                            dataObject.age=rows[i][j];
                        break;
                        case "1":
                            dataObject.maleInfectionCount=rows[i][j];
                        break;

                        case "2":
                            dataObject.malePercentage=rows[i][j];
                        break;

                        case "3":
                            dataObject.maleIncidence=rows[i][j];
                        break;

                        case "4":
                            dataObject.femaleInfectionCount=rows[i][j];
                        break;

                        case "5":
                            dataObject.femalePercentage=rows[i][j];
                        break;

                        case "6":
                            dataObject.femaleIcidence=rows[i][j];
                        break;
                        
                        case "7":
                            dataObject.totalInfectionCount=rows[i][j];
                        break;
                        
                        case "8":
                            dataObject.totalPercentage=rows[i][j];
                            data.push(dataObject);
                        break;

                    }
                }
            }
        }
        console.log(data);
    })
}
function handleKantone(filename, sheetname) {
    // xlsxFile(`./files/${filename}`,{ sheet: sheetname }).then((rows) => {for (i in rows){
    //     for (j in rows[i]){
    //         console.log(rows[i][j]);
    //     }
    // }})
}
function hanldeHospit(filename, sheetname) {
    // xlsxFile(`./files/${filename}`,{ sheet: sheetname }).then((rows) => {for (i in rows){
    //     for (j in rows[i]){
    //         console.log(rows[i][j]);
    //     }
    // }})
}
function handleTod(filename, sheetname) {
    // xlsxFile(`./files/${filename}`,{ sheet: sheetname }).then((rows) => {for (i in rows){
    //     for (j in rows[i]){
    //         console.log(rows[i][j]);
    //     }
    // }})
}


exports.handleEpiKurve = handleEpiKurve;
exports.handleAltersVerteilung = handleAltersVerteilung;
exports.handleKantone = handleKantone;
exports.hanldeHospit = hanldeHospit;
exports.handleTod = handleTod;