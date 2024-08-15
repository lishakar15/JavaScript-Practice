import {convertCents} from "../Money.js"

console.log("Testing currencyConverter");

const amount = convertCents(2550);
if(amount === "25.50")
{
    console.log("Testcase passed");
}