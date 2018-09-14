// this file is used only for understanding how mocha library is working 

const assert = require('assert'); 

// the class that we are going to be testing 
class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}


let  car = null ; 
beforeEach(() => {
  car = new Car();
});

// 'Car' here is just for telling it what we are testing it could be 'Car Object'
describe('Car Test Object', () => {

  // again 'park is working' is a name of test used for referencing 
  it('can park', () => {
    assert.equal(car.park(), 'stopped');
  });

  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  });
   
});