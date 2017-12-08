console.log('blaaa');

this.addEventListener("message", (msg) => {
    console.log('message', msg)
})


this.postMessage("blaaa");