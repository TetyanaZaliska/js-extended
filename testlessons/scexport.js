export function sayHi(name) {
    console.log(`User ${name} sayed hi`);
}

export {sayBye, goOffline};

function sayBye() {
    console.log('Bye');
}

function goOffline() {
    console.log('Offline');
}

export default function sayAll(userName) {
    sayHi(userName);
    sayBye();
    goOffline();
}