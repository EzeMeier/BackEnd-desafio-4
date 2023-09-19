import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { productService } from "./persistence/index.js";

import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname,"/public")));

const httpServer = app.listen(port,()=>console.log(`Servidor ejecutandose en el puerto ${port}`));

const io = new Server(httpServer);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts", cartsRouter);

io.on("connection", async(socket)=>{
    console.log("cliente conectado");
    const products = await productService.getProducts();
    socket.emit("productsArray", products);

    socket.on("addProduct",async(productData)=>{
        const result = await productService.createProduct(productData);
        const products = await productService.getProducts();
        io.emit("productsArray", products);
    });
});
