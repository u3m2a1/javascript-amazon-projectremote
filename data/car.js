class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = carDetails.speed;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    console.log(`${this.#brand} ${this.#model}`);
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h Trunk: ${this.isTrunkOpen}`);
  }

  go() {
    if(!this.isTrunkOpen)
    {
      if((this.speed > 0) & (this.speed < 200))
      {
        this.speed += 5;
      }else {
        console.log('speed should be between 0 and 200');
      }
    }
  }

  brake() {
    if((this.speed > 0) & (this.speed < 200))
    {
      this.speed -= 5;
    }else {
      console.log('speed should be between 0 and 200');
      return;
    }
  }

  openTrunk() {
    if(this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if((this.speed > 0) & (this.speed < 300))
    {
      this.speed += 5;
    }else {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk');
  }
}

const car1 = new Car(
  {
    brand: 'Toyota',
    model: 'Corolla',
    speed: 150
  }
);

const car2 = new Car(
  {
    brand: 'Tesla',
    model: 'Model 3',
    speed: 0
  }
);

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

car1.go();
car1.go();
car1.go();
car1.brake();
car1.closeTrunk();

car2.brake();
car2.openTrunk();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();

console.log(car1);
car1.displayInfo();

console.log(car2);
car2.displayInfo();