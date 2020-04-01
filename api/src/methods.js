"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const keyFilePath = __dirname + '/data/key.json';
function getUniqueIndex() {
    const keyFile = fs_1.default.readFileSync(keyFilePath, 'utf-8');
    let min = 0, max = 9999999;
    let currSet = JSON.parse(keyFile);
    let exists = false;
    while (true) {
        let newIndex = (Math.floor(Math.random() * (+max - +min))).toString();
        for (let x of currSet) {
            if (x == newIndex) {
                exists = true;
            }
        }
        if (!exists) {
            currSet.push(newIndex);
            currSet = JSON.stringify(currSet);
            fs_1.default.writeFile(keyFilePath, currSet, 'utf-8', (err) => {
                if (err) {
                    return console.log(err);
                }
            });
            return newIndex;
        }
    }
}
exports.getUniqueIndex = getUniqueIndex;

