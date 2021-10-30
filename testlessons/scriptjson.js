'use strict';

const persone = {
    name: "Alex",
    tel: '+74444444',
    parents: {
        mom: 'Liza',
        dad: 'Mike'
    }
};

const clone = JSON.parse(JSON.stringify(persone));

clone.parents.mom = 'Anna';

console.log(persone);
console.log(clone);

console.log(JSON.stringify(persone));