const socketClient = io();
console.log('cliente')


const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const products = document.getElementById("products");

form.onsubmit = (e) =>{
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    socketClient.emit('newProd', { name, price })
}

socketClient.on('', (array)=>{
    let infoProducts = ''
    array.map((p)=>{
        infoProducts += `${p.name} - ${p.price} <br>`
    })
    products.innerHTML = infoProducts
})