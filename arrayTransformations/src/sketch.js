let agentA, agentB;
let agents = []; // 1 dimension 
let sideLength = 3;
let step = 40;
let rslt

function setup() {
    createCanvas(800, 800);

    // populate the array
    for (let i = 0; i < sideLength * sideLength; i++) {
        agents[i] = new Agent();
        agents[i].setAngle(PI / 4);
        agents[i].updateNeedle();
    }

    // transformOneDintoTwoD(agents, 2, fromOneDtoTwoD);

    // rslt = fromTwoDtoOneD(rslt)
    // console.log(rslt);

    // Set agent positions in a 2D array
    // for the cols
    for (let i = 0; i < sideLength; i++) {
        // for the rows    
        for (let j = 0; j < agents.length / sideLength; j++) {
            let agentTemp = getElementFromOneDimArray(agents, i, j, sideLength);
            if (agentTemp != undefined) {
                agentTemp.setPosition(100 + i * step, 100 + j * step);
                agentTemp.updateNeedle();
            }
        }
    }
}

function draw() {
    background(220);

    for (let i = 0; i < agents.length; i++) {
        agents[i].show();
        agents[i].spin(random(0.01));
        agents[i].updateNeedle();
    }

    let quad = getQuad(agents, 0, 0, sideLength);

    beginShape()
    for (const elem of quad) {
        vertex(elem.tip.x, elem.tip.y)
    }
    endShape(CLOSE);

}

// Creating a class
class Agent {
    constructor() {
        this.pos = createVector(200, 200);
        this.angle = 0;
        this.needle = 20;
        this.tip = createVector(0, 0);
    }

    setPosition(newX, newY) {
        this.pos.x = newX;
        this.pos.y = newY;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    show() {
        circle(this.pos.x, this.pos.y, 10);
        line(this.pos.x, this.pos.y, this.tip.x, this.tip.y);
    }

    updateNeedle() {
        this.tip.x = this.pos.x + (cos(this.angle) * this.needle);
        this.tip.y = this.pos.y + (sin(this.angle) * this.needle);
    }

    spin(speed) {
        this.angle += speed;
    }
}