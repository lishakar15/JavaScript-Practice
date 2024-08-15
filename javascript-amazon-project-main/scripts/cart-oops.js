class Cart {

    carId;
    carName;
    model;

    constructor(carId,carName,model)
    {
        this.carId = carId;
        this.carName=carName;
        this.model=model;
    }

    printCarDeatils(){
        console.log("Car details prinited");
    }
}

let cart = new Cart(1,"BMW","X500");
cart.printCarDeatils();