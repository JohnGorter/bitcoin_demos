var oldy = 25;
var buyprice = 0;
var amount = 0;
var wallet = 100.0;
updateWallet();

window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", { 
        title: {  text: "Bitcoin koers" },
        data: [ { type: "spline", dataPoints: [] } ]
    });
    chart.render();	
    window.setInterval(() => {
        var length = chart.options.data[0].dataPoints.length;
        chart.options.title.text = "New DataPoint Added at the end";
        var percent = Math.floor(Math.random() * 21) - 10;
        var newy = oldy + (oldy * percent / 100);
        oldy = newy;
        chart.options.data[0].dataPoints.push({ y: newy});
        chart.render();
    }, 1000);
};

document.querySelector("#buy").addEventListener('click', () =>{
    buyprice = oldy;
    var buyamount = parseInt(document.querySelector("#amount").value);
    var total =  buyamount * buyprice;
    document.querySelector("#loglist").innerHTML += `<li>buy total ${total.toFixed(2)} at price ${buyprice.toFixed(2)}</li>`;
    wallet -= total;
    amount += buyamount;
    updateWallet();
});
document.querySelector("#sell").addEventListener('click', () =>{
    var sellamount = parseInt(document.querySelector("#amount").value);
    var total = oldy * sellamount;
    document.querySelector("#loglist").innerHTML += `<li>sell total ${total.toFixed(2)} at price ${oldy.toFixed(2)}</li>`;
    wallet += total;
    amount -= sellamount;
    updateWallet();
}); 

function updateWallet(){
    document.querySelector("#wallet_amount").innerText = ` ${wallet.toFixed(2)}`;
    document.querySelector("#portfolio").innerText = ` ${amount} bitcoin`;
    document.querySelector("#sell").disabled = !amount;
}

function login(){
    var pwd = document.querySelector("#password").value;
    document.querySelector("#loginform").hidden = (pwd == "secret");
    document.querySelector("#logindisplay").hidden = (pwd != "secret");
    document.querySelector("#loginerror").hidden = (pwd == "secret");
    document.querySelector("#chart").hidden = (pwd != "secret");
    document.querySelector("#wallet").hidden = (pwd != "secret");
    document.querySelector("#log").hidden = (pwd != "secret");
    document.querySelector("#usernamespan").innerText = document.querySelector("#username").value;
    setTimeout(() => {
        if (pwd == "secret")
        {
            document.querySelector("#wallet").classList.remove("start");
            document.querySelector("#chart").classList.remove("start");
            document.querySelector("#log").classList.remove("start");
        }
    }, 50); 
}