'use strict';

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    calcArea() {
        return this.height * this.width;
    }
}

class ColoredRectangleWithText extends Rectangle {
    constructor(height, width, text, color) {
        super(height, width);
        this.text = text;
        this.color = color;
    }

    showMyProps() {
        console.log(`My text: ${this.text}, and color: ${this.color}`);
    }
}

const redRect = new ColoredRectangleWithText(10, 150, '"Hello world"', 'red');
redRect.showMyProps();
console.log(redRect.calcArea());

// const square = new Rectangle(10, 10);
// const long = new Rectangle(25, 10);

// console.log(square.calcArea());
// console.log(long.calcArea());