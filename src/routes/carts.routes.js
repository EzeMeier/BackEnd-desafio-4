import {Router} from "express";
import { cartsService } from "../persistence/index.js";

const router = Router();

router.get("/",async (req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json ({data:carts});
    } catch (error) {
        res.json({error:error.massage})
    }
})

router.get("/carts/:cid",async(req,res)=>{
    const carritofound=await manager.getCartbyId(req.params)
    res.json({status:"hecho",carritofound})
})

router.post ("/", async (req,res)=>{
    try {
        await cartsService.createCart();
    } catch (error) {
        res.json({error:error.massage})
    }
}
);
    router.post("/carts/:cid/products/:pid", async (req, res) => {
        try {
          const cid = parseInt(req.params.cid);
          const pid = parseInt(req.params.pid);
      
          await manager.addProductToCart(cid, pid);
          res.json({ status: "Hecho", message: "Producto agregado correctamente al carrito." });
        } catch (error) {
          console.error("Error al agregar producto al carrito:", error);
          res.status(500).json({ status: "error", message: "Error al agregar producto al carrito." });
        }
})

export {router as cartsRouter};