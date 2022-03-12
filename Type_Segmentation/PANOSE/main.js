const opentype = require('opentype.js');
const CircularJSON = require('circular-json');
const ttfsource = require('./ttfsource.json');
const http = require('http'); 
const fs = require('fs');
const glob = require("glob")


const allfontlist = ttfsource.items.map((x) => {
    return Object.values(x.files)
}).flat()

const af2 = allfontlist.slice(0, 5)
let result = []

// -----------------------------------------------------------------------------------------
// uncomment these to download the ttfs from ttfsource.json

// const download = (x, c) => http.get(x, function (response) {
//     const file = fs.createWriteStream(`temp${c}.ttf`);
//     const stream = response.pipe(file);
//     stream.on('finish', () => {
//         file.close();
//     });
// });
 
// const download_result = async () => {
//     const unresolvedPromises = af2.map((x,c) => {
//     download(x,c)
// })
// await Promise.all(unresolvedPromises);
// }


// download_result();
// console.log('Done downloading!')
// ---------------------------------------------------------------------------------------------



// -------------------- readttf with integer version(c) ----------------------------------------
//
// const readttf = (c) => {
//     const x=  opentype.loadSync(`temp${c}.ttf`);
    
//     fs.appendFile('file.log', CircularJSON.stringify(x)+",", err => {
//         if (err) {
//           console.error(err)
//           return
//         }
//       });
//     return "";
// }
// const process_result = () => af2.map((x, c) => readttf(c));
// console.log(process_download())
// ---------------------------------------------------------------------------------------------

const readttf = (c) => {
    const x=  opentype.loadSync(c);
    const panose = x?.tables?.os2?.panose
    console.log(panose)
    if(panose!== undefined){
        fs.appendFile('file.json', `${c},${panose}\n`, err => {
            if (err) {
              console.error(err)
              return
            }
          });
    }
    return "";
}

const read_from_dir = () => {
    glob("OTF/*.otf", function (er, files) {
        files.forEach(x => {
            // console.log(x)
            try {
                readttf(x)
            } catch (error) {
                
            }
        })
      })
}

read_from_dir()