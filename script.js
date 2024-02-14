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
    constructor(floors) {
        this.floors = floors;
        this.liftLeft = new Lift(0);
        this.liftRight = new Lift(floors - 1);
    }

    CallLift(towards) {
        let diff1 = Math.abs(this.liftLeft.position - towards);
        let diff2 = Math.abs(this.liftRight.position - towards);

        if (diff1 < diff2) {
            this.liftLeft.position = towards;
        }
        else if (diff1 > diff2) {
            this.liftRight.position = towards;
        }
        else {
            if (this.liftLeft.position <= this.liftRight.position) {
                this.liftLeft.position = towards;
            }
            else {
                this.liftRight.position = towards;
            }
        }
    }

    PrintPosition() {
        console.log(`${this.liftLeft.position} - ${this.liftRight.position}`);
    }
}


const building = new Building(7);
building.CallLift(4);
building.CallLift(2);
building.CallLift(3);
building.PrintPosition();