var currentprice = 25;
var buyprice = 0;
var amount = 0;
var index=0;
var wallet = 100.0;
updateWallet();

document.querySelector("#sell").hidden = !navigator.onLine;
document.querySelector("#buy").hidden = !navigator.onLine;

window.addEventListener("online", () => {
    document.querySelector("#sell").hidden = false;
    document.querySelector("#buy").hidden = false;
});
window.addEventListener("offline", () => {
    document.querySelector("#sell").hidden = true;
    document.querySelector("#buy").hidden = true;
    
});


window.onload = function () {
    if (window.localStorage["bitcoinwallet"]) {
        var walletdata = JSON.parse(window.localStorage["bitcoinwallet"]);
        wallet = walletdata.wallet;
        amount = walletdata.amount;
        updateWallet();
    }

    var chart = new CanvasJS.Chart("chartContainer", { 
        title: {  text: "Bitcoin koers" },
        axisX:{
            gridThickness: 1       
          },
          axisY:{        
            gridThickness: 1,
            interlacedColor: "azure",
            tickColor: "azure",
            titleFontColor: "rgb(0,75,141)",
          },
        data: [ { type: "area",
                  color: "rgba(12,143,221,.7)",dataPoints: [] }],
    });

    chart.render();
    var socket = io('http://bitcoindemo.azurewebsites.net/');
    socket.on('stockdata', (data) => {
          console.log(data);
          chart.options.title.text = "BITCOIN";
          currentprice = data.value;
          chart.options.data[0].dataPoints.push({ x: index++, y: currentprice});    // add the new value to the right
           if (chart.options.data[0].dataPoints.length > 10){
               chart.options.data[0].dataPoints.shift();        // remove the first left value
           }
          chart.render();
          
    });
};

document.querySelector("#buy").addEventListener('click', () =>{
    buyprice = currentprice;
    var buyamount = parseInt(document.querySelector("#amount").value);
    var total =  buyamount * buyprice;
    document.querySelector("#loglist").innerHTML += `<li>buy total ${total.toFixed(2)} at price ${buyprice.toFixed(2)}</li>`;
    wallet -= total;
    amount += buyamount;
    window.localStorage["bitcoinwallet"] = JSON.stringify({ amount:amount, wallet:wallet});
    updateWallet();
});
document.querySelector("#sell").addEventListener('click', () =>{
    var sellamount = parseInt(document.querySelector("#amount").value);
    var total = currentprice * sellamount;
    document.querySelector("#loglist").innerHTML += `<li>sell total ${total.toFixed(2)} at price ${currentprice.toFixed(2)}</li>`;
    wallet += total;
    amount -= sellamount;
    window.localStorage["bitcoinwallet"] = JSON.stringify({ amount:amount, wallet:wallet});
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

function getCash(){
    var reader = new FileReader();
    reader.onload = (e) =>{
        var cash = JSON.parse(e.target.result);
        wallet += parseInt(cash.wallet);
        amount += parseInt(cash.amount);
        updateWallet();
    };
    reader.readAsText(event.dataTransfer.files[0]);
    prevent(); 
}

function prevent(){
    event.preventDefault();
    event.stopPropagation();
}

function downloadWallet(){
    var newBlob = new Blob([JSON.stringify({wallet:wallet, amount:amount})], {type: "application/json"})
    var a = document.createElement("a");
    a.download = "wallet.txt";
    var data =  window.URL.createObjectURL(newBlob);
    a.href = data;
    a.click(); 
    setTimeout(function(){
        window.URL.revokeObjectURL(data);
    }, 100);
}