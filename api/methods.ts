import fs from "fs";

const keyFilePath: string = __dirname + '/data/key.json';

export function getUniqueIndex() {
    const keyFile: string = fs.readFileSync(keyFilePath, 'utf-8');
    let min: number = 0, max: number = 9999999;
    let currSet = JSON.parse(keyFile);

    let exists: boolean = false;
    while(true) {
        let newIndex: string = (Math.floor(Math.random()*(+max - +min))).toString();
        for(let x of currSet) {
            if(x == newIndex) {
                exists = true;
            }
        }
    
        if(!exists) {
            currSet.push(newIndex);
            currSet = JSON.stringify(currSet);
            fs.writeFile(keyFilePath, currSet, 'utf-8', (err) => {
                if(err) {
                    return console.log(err);
                }
            });
            return newIndex;
        }
    }
}
