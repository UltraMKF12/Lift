const liftLeft = {
    lift: document.getElementById("lift1"),
    text: document.getElementById("lift1-text"),
    buttons: document.querySelectorAll(".lb1")
}
const liftRight = {
    lift: document.getElementById("lift2"),
    text: document.getElementById("lift2-text"),
    buttons: document.querySelectorAll(".lb2")
}

const floorLiftDirectionTexts = document.querySelectorAll(".floor-lift-positions");


//------------------------------//
// Functions that buttons call  //
//------------------------------//
// Called by a floor buttons
function floorCall(floor) {
    building.moveClosestLift(floor);
}

// Called by lift buttons
function liftCall(lift, floor) {
    let chosenLift;
    if(lift === 1) chosenLift = building.liftLeft;
    else chosenLift = building.liftRight;
    building.moveLift(chosenLift, floor);
}


//-----------//
// Classes   //
//-----------//
const LiftState = {
    Moving: "Moving",
    Stopped: "Stopped",
};

class Lift {
    constructor(position, liftData) {
        this.position = position;
        this.liftData = liftData;
        this.state = LiftState.Stopped;
        this.destination;
        this.direction;  // "up", "down", undefined
    }

    setDestination(floor) {
        this.destination = floor;
    }

    moveTowardsDestination() {
        if (this.destination == this.position)
        {
            this.unlockButtons();
            this.direction = undefined;
            this.state = LiftState.Stopped;
            building.updateFloorDirections();
            return;
        }

        if (this.state != LiftState.Moving)
        {
            this.lockButtons();
            this.state = LiftState.Moving;
        }

        let sign = Math.sign(this.destination - this.position);
        if(sign > 0) this.direction = "up";
        else this.direction = "down";
        building.updateFloorDirections();  // If the destination changes while moving

        // This simulates the lift moving using recursion
        setTimeout(() => {
            // Recalculate sign to avoid a bug where the lift overshoots
            // When selecting a new floor while it's moving
            sign = Math.sign(this.destination - this.position);
            this.position += sign;
            this.updateLiftPosition();
            this.moveTowardsDestination();
        }, 500);
    }

    updateLiftPosition() {
        this.liftData.text.textContent = this.position.toString();
        this.liftData.lift.style.gridRow = 7 - this.position;
    }

    lockButtons() {
        this.liftData.buttons.forEach(element => {
            element.disabled = true;
        });
    }

    unlockButtons() {
        this.liftData.buttons.forEach(element => {
            element.disabled = false;
        });
    }
}

class Building {
    constructor(floors) {
        this.floors = floors;
        this.liftLeft = new Lift(0, liftLeft);
        this.liftRight = new Lift(floors - 1, liftRight);
    }

    getClosestLift(floor) {
        let diff1 = Math.abs(this.liftLeft.position - floor);
        let diff2 = Math.abs(this.liftRight.position - floor);

        if (diff1 < diff2) {
            return this.liftLeft;
        }
        else if (diff1 > diff2) {
            return this.liftRight;
        }
        else {
            if (this.liftLeft.position <= this.liftRight.position) {
                return this.liftLeft;
            }
            else {
                return this.liftRight;
            }
        }
    }

    moveClosestLift(floor) {
        let closestLift = this.getClosestLift(floor);
        this.moveLift(closestLift, floor);
    }

    moveLift(lift, floor) {
        lift.setDestination(floor);
        if (lift.state == LiftState.Stopped) {
            lift.moveTowardsDestination();
        }
    }

    // Rebuild all arrow texts that are pointing towards lift position.
    updateFloorDirections() {
        let newText =  "";

        if(this.liftLeft.direction == "up") newText += " ↑ ";
        else if(this.liftLeft.direction == "down") newText += "↓ ";
        else newText += "- ";

        if(this.liftRight.direction == "up") newText += " ↑";
        else if(this.liftRight.direction == "down") newText += "↓";
        else newText += "-";
        
        floorLiftDirectionTexts.forEach(element => element.textContent = newText);
    }
}

//--------------------------//
// Initializing variables   //
//--------------------------//
const building = new Building(7);