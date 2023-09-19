import { Router } from "express";
import { productService } from "../persistence/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const products = await productService.getProducts();
    console.log("products", products);
    res.render("home", {products});
});

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTime");
});

export { router as viewsRouter};