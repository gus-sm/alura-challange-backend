const { parse } = require('csv-parse'),
fs = require('fs'),
getStream = require('get-stream');

const csvStreamReader = (filePath) => {

    async function read(){
        const csv = fs.createReadStream(filePath);
        return await getStream.array(csv.pipe(parse({delimiter: ','})));
    }

    return {read};

}

module.exports = csvStreamReader;