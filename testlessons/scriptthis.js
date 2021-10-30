'use strict';

// // 1)
// function showThis(a, b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         // return this.a + this.b;
//         return a + b;
//     }
//     console.log(sum());
// }

// showThis(4, 5);

// // 2)
// const obj = {
//     a: 4,
//     b: 5,
//     sum: function() {
//         console.log(this);
//         console.log(this.a + this.b);
//         function shout() {
//             console.log(this);
//         }
//         shout();
//     }
// };
// obj.sum();

// // 3)
// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true; 
//     this.hello = function () {
//         console.log(`Hello ${this.name}`);
//     };
// }

// const ivan = new User('Ivan', 23);

// // 4)
// function sayName(surname) {
//     console.log(this);
//     console.log(this.name + surname);
// }

// const user = {
//     name: 'John'
// }

// sayName.call(user, 'Smith');
// sayName.apply(user, ['Smith']);

// function count(num) {
//     return this * num;
// }

// const double = count.bind(2);

// console.log(double(3));
// console.log(double(13));

// 1) Обычная фукция: this = window, но если use strict = undefined
// 2) Контекст у метода объекта = сам объект
// 3) this в конструкторе и классе = новый экземпляр объекта
// 4) Ручная привязка this: call, apply, bind

const btn = document.querySelector('button');

// btn.addEventListener('click', function () {
//     console.log(this);
// });
// btn.addEventListener('click', () => {
//     console.log(this);
// });
btn.addEventListener('click', function () {
    this.style.backgroundColor = 'red';
});
// btn.addEventListener('click', (e) => {
//     e.target.style.backgroundColor = 'red';
// });

const obj = {
    num: 5,
    sayNumber: function() {
        const say = () => {
            console.log(this.num);
        };
        say();
    }
};

obj.sayNumber();

const double = a => a*2;

console.log(double(5));