const { parse } = require('csv-parse');
fs = require('fs');

const csvStream = (filePath, callback) => {
    let data = [];
    const csv = fs.createReadStream(filePath);
    csv.pipe(parse({delimiter: ';'}))
    .on('data', function(row){
        data.push(row);
    })
    .on('end',function(){
        callback(data);
    });

}

module.exports = csvStream;