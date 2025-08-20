// let ProductCount = 1;
// let PriceCount = 499;

// function decrease() 
// {
//     if (ProductCount > 1) 
//     {
//         ProductCount--;
//         PriceCount -= 499 ;
//         document.getElementById("ProductCount").innerText = ProductCount;
//         document.getElementById('Price-Count').innerText = "$ " + PriceCount;
//     }
//     else 
//     {
//         alert("Product Must be 1");
//     }
// }

// function increase() 
// {
//     ProductCount++;
//     PriceCount += 499;
//     document.getElementById("ProductCount").innerText = ProductCount;
//     document.getElementById('Price-Count').innerText = "$ " + PriceCount;
// }

// function sendId(imageid)
// {
//     let clickedImage = document.getElementById(imageid);
//     document.getElementById("displayImage").src = clickedImage.src;
// }

function study() {
    //"use strict";
    console.log(a);
    var a = 10;
    console.log(a);

    // console.log(b);
    const b = 10;
    console.log(b);

    //console.log(c);
    let c = 10;
    console.log(c);

    greet();
    // sayhi();
    //arrow();
    function greet() {
        var a = 12;
        console.log(a);
    }

    var sayhi = function () {
        console.log("Hi!..")
    }

    var arrow = () => {
        console.log("Hi");
    }

    class car {
        constructor() {
            console.log("Class")
        }
    }
    const obj = new car();

    function id(name = 'Kabilan', message = name + 'Welcome') {
        console.log(message);
    }
    id('Rocky');

    var a = 10;
    var a = 12;
    console.log(a);

    let dn = 5;
    console.log(dn);

    // create = "Created"
    // console.log(create);

    // done = "Done";
    // console.log(done);
    for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log("var i:", i), 100);
    }
    // Output: var i: 3, var i: 3, var i: 3

    for (let j = 0; j < 3; j++) {
        setTimeout(() => console.log("let j:", j), 100);
    }
    // Output: let j: 0, let j: 1, let j: 2

    eval("var z = 50;")
    console.log(z);
    
    var fun = function call()
    {
        console.log("FunctionCalled");
    };

    fun();
    //call();
}

