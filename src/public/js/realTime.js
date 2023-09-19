const socketClient = io();

const productList = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    for(const [key,value] of formData.entries()){
        jsonData[key]=value
    };
    jsonData.price = parseInt(jsonData.price);
    console.log(jsonData);
    socketClient.emit("addProduct",jsonData);
    createProductForm.reset();
});

socketClient.on("productsArray", (dataProducts)=>{
    console.log(dataProducts);
    let productsElms="";
    dataProducts.forEach(product=>{
        productsElms +=
        `<li>
            <p>Nombre: ${product.title}</p><button onclick="deleteProduct(${product.id})">Eliminar</button>
        </li>`
    });

    productList.innerHTML=productsElms;
});

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id");
    const deleteid = parseInt(deleteidinput.value);
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });
socketClient.on("productosupdated", (obj) => {
  updateProductList(obj);
});