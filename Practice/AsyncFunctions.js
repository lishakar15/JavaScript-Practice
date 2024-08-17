


const proceedToPayment = function (){
    setTimeout(()=>{
        console.log("Payment done");
    },2000);
};

const generateInvoice = function(){
    console.log("Invoice Generated");
};

const cart = ["Pencil","Ball","Cup"];

// Normal method of calling an API without any Async code
const oderItemsFromCart = function(cart)
{
    setTimeout(()=>       // Simulatin the API response time by manualy setting using setTimeout()
    {
        console.log("Calling an API");
        return JSON.stringify(cart);
    },2);
}
const orderDetails = oderItemsFromCart(cart);
console.log("Order Details "+orderDetails)


//Using Callback Function
const orderItems = function (cart,fun){ //It accepts  a function as an argument to call it back
    setTimeout(()=>{
        console.log("Ordering Items");
        const response = JSON.stringify(cart)
        fun(response);      // Calling back the function for next steps
    },2000);
};
 
orderItems(cart,function (orderDetails1){ //Here passing a function to call it back once we get the API reponse 
    console.log("Order successfull");
    console.log("Order Details "+orderDetails1)
});

console.log("Thank you for Ordering");

// Promise Fucntion returns Promise 
const orderItemPromise = function (cart){

    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Ordering Items using Promise");
            resolve(JSON.stringify(cart));
        },2000);
    });
};

//Calling the function which return a Promise
orderItemPromise(cart).then((response)=>{
    console.log("Response from promise method = "+response );
});

//Using Promise with fetch()
const API_URL ="https://jsonplaceholder.typicode.com/todos/1";

const userPromiseObj = fetch(API_URL); //fetch gets the response from the API and returns promise object

userPromiseObj.then((response)=>{  //Once promise is resolved by the fecth method this will be executed
    const jsonPromise = response.json(); //Extracting API response from the promise object

    jsonPromise.then((data)=>{ // once the response json is created then this promise will be resolved 
        console.log(JSON.stringify(data)); //printing the actual API response
    });
});

//Promise with resolve and reject
const validateCart = function(cart){
    //Do validate cart
    return true;
    //return false;
}
const createOrder = function(cart)
{
    return JSON.stringify(cart);
}
// Promise Fucntion returns Promise 
const createOrder1 = function(cart)
{
    return new Promise((resolve,reject)=>{
        //Validate the cart
        if(!validateCart(cart))
        {
           return reject("Invalid Cart"); //Rejecting the promise and return is important
        }
        //Logic create order
        const orderId = 1234;
        setTimeout(()=>{
            const response = createOrder(cart);
            console.log("response = "+response);
            resolve(orderId);  // Successful execution
        },2000);
        });
}

//calling the promise function
createOrder1(cart)
.then((orderId)=>{
    console.log("order id = "+orderId);
})
.catch((error)=>{
    console.log("Error occurred "+error);
});

//Promise chainning - Replace of Callback hell
createOrder(cart) //createOrder returns promise
.then((orderId) => {
    return proceedToPayment(orderId); //returns promise
})
.then((paymentId)=>{
    return showOrderSummary(paymentId); //returns promise
})
.then((paymnetInfo)=>{
    updateWalletBalance(paymnetInfo); //returns promise
}); 

//Fetch method simplified
fetch(API_URL)
.then((response)=>response.json())
.then((data)=>console.log("Simplified Data "+JSON.stringify(data)));

const doHttpRequest = async function (URL){
    try{
        const response = await fetch(URL) ;
        const data = await response.json();
        console.log("Await response => "+ JSON.stringify(data));
    }
    catch(error)
    {
        console.error("Error occured "+error);
    }

}

doHttpRequest(API_URL);