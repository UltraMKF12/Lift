const LiftState = {
    Moving: "Moving",
    Stopped: "Stopped",
    Called: "Called"
};

class Lift {
    constructor(position) {
        this.position = position;
    }
}

class Building {
    constructor (floors) {
        this.floors = floors;
        this.liftLeft = new Lift(0);
        this.liftRight = new Lift(floors-1);
    }
}

function CallLift(lift, towards) {
    let diff1 = Math.abs(lift[0] - towards);
    let diff2 = Math.abs(lift[1] - towards);

    if (diff1 < diff2) {
        lift[0] = towards;
    }
    else if (diff1 > diff2) {
        lift[1] = towards;
    }
    else {
        if (lift[0] <= lift[1]) {
            lift[0] = towards;
        }
        else {
            lift[1] = towards;
        }
    }
}

let lift = [0, 6];

CallLift(lift, 4);
CallLift(lift, 3);
CallLift(lift, 2);
CallLift(lift, 1);
CallLift(lift, 1);
console.log(lift);