import {Router} from "express";
import { productService } from "../persistence/index.js";

const router = Router();

router.get("/",async (req,res)=>{
    const products = await productService.getProducts(req.query)
    res.json({message: products});
});

router.post ("/", async(req,res)=>{
    try {
        const productInfo = req.body;
    } catch (error) {
        res.json({status: "error", message:error.message});
    }
})

router.get("/:pid", async(req,res)=>{
    try {
        
        const productId = parseInt(req.params.pid);
        const product = await productService.getProductById(productId);
        res.json({message:"endpoint para obtener un producto a traves del Id", data:product});
    } catch (error) {
        
        res.json({status: "error", message:error.message});
    }
    
    router.put("/:pid", async (req, res) => {
        const updatedproduct = await manager.updateProduct(req.params,req.body);
         res.json({ status: "hecho", updatedproduct });
      });
});
      
      router.delete("/:pid", async (req, res) => {
        const deleteproduct = await manager.deleteProduct(req.params);
         res.json({ status: "hecho",deleteproduct });

});

export {router as productsRouter};