'use strict';

function* generator() {
    yield 'S';
    yield 'c';
    yield 'r';
    for (let i = 3; i < 6; i++) {
        const str = 'Script';
        yield str[i];
    }
}

for (let k of generator()) {
    console.log(k); 
}

const genfunc = generator();

console.log(genfunc.next());
console.log(genfunc.next());
console.log(genfunc.next());
console.log(genfunc.next());
console.log(genfunc.next());
console.log(genfunc.next());
console.log(genfunc.next());

function* count(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

const cnt = count(7);
console.log(cnt.next().value);
console.log(cnt.next().value);
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next());
console.log(cnt.next().value);

for (let x of count(10)) {
    console.log(x);
}