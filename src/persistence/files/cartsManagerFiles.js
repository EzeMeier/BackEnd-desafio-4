import fs from "fs";

export class CartsManagerFiles{
    constructor(path){
        this.pathFile = path;
    };

    fileExist(){
        return fs.existsSync(this.pathFile);
    };

    async getCarts(){
        try {
            if(this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
                const carts = JSON.parse(contenidoString);
                return carts;
            } else {
                throw new Error("No se pudieron obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    };

    getCartbyId=async(id)=>{

        try {
         const {cid}=id
         if (fs.existsSync(this.path)) {
           const allcarts=await this.getCarts()
           const found=allcarts.find(element=>element.id===parseInt(cid))
           if (found) {
             return found;
           } else {
            return ("cart no existe");
           }
         } else {
           return("cart file json  not found");
         }
       } catch (error) {
         return(error);
       }
     }
    
       generatecartId=async()=>{
         try {
           if (fs.existsSync(this.path)) {
             const cartlist = await fs.promises.readFile(this.path, "utf-8");
             const cartlistJs = JSON.parse(cartlist);
             const counter = cartlistJs.length;
             if (counter == 0) {
               return 1;
             } else {
               return cartlistJs[counter - 1].id + 1;
             }
           }
         } catch (error) {
           throw new Error(error);
         }
       }
       addCart = async () => {
         const listaCarts = await this.getCarts();
         const id = await this.generatecartId();
         const cartNew = {
           id,
           products: []
         };
         listaCarts.push(cartNew);
         await fs.promises.writeFile(this.path, JSON.stringify(listaCarts, null, 2));
       }
       
   
         addProductToCart = async (cid, pid) => {
           const listaCarts = await this.getCarts();
           const cart = listaCarts.find(e => e.id === cid);
           const productIndex = cart.products.findIndex(p => p.pid === pid);
         
           if (productIndex !== -1) {
             
             cart.products[productIndex].quantity++;
           } else {
             
             cart.products.push({
               pid,
               quantity: 1
             });
           }
         
           await fs.promises.writeFile(this.path, JSON.stringify(listaCarts,null,2));
         }
                
       }