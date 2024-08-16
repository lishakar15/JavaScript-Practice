class Cart {

    carId
    #carName;
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

let cart = new Cart(10,"Tata Nano","MTR345");
console.log(cart.carName);
console.log(cart.printCarDeatils());


const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});
xhr.open('GET','https://supersimplebackend.dev/');
xhr.send();
