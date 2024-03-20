const express= require("express");
const app= express();
const addTwoNumber= (n1,n2) => {
    return n1+n2;
}
app.get("/addTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = addTwoNumber(n1,n2);
    res.json({statuscode:200, data: result}); 
});

app.get("/", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));     
})

//as per tutorial - adding two numbers together for the console
var number1 = 24
var number2 = 49
console.log("adding the following numbers together: " + number1 + " and " + number2)
console.log (addTwoNumber(number1,number2));
const port=3040;
app.listen(port,()=> {
    console.log("also, we're gonna be listening to port "+port);
})