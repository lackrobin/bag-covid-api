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
    xlsxFile(`./files/${filename}`,{ sheet: sheetname }).then((rows) => {for (i in rows){
        for (j in rows[i]){
            console.log(rows[i][j]);
        }
    }})
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