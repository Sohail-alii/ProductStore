import type {Response, Request} from "express"
import * as queries from "../db/queries"
import { getAuth } from "@clerk/express"

//getting All products
export const getAllProducts = async (req: Request, res: Response) => {
    try{
        const products = await queries.getAllProducts()
        res.status(200).json(products);

    } catch(error) {
        console.error("Error getting products", error);
        res.status(500).json({error: "failed getting products"});
    }
}

//get my productt
export const getMyProducts = async (req: Request, res: Response) => {
    try{
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({error: "Unaothurized"});

        const products = await queries.getProductByUserId(userId);
        res.status(200).json(products);
} catch(error) {
    console.error("Error getting user product", error);
    res.status(500).json({error: "failed to get user products"})
}
}
//getting single products(protected)

export const getProductById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const product = await queries.getProductById("id");
        if (!product) return res.status(404).json({error: "product not found"});

        res.status(200).json(product);
    } catch(error){
        console.error("error getting products", error);
        res.status(500).json({error: "get product error"});
    }
}

//Create product (protected)
export const createProduct = async (res: Response, req: Request) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({error: "Unathuories"});

        const { title, description, imageUrl} = req.body;
        if ( !title || !description || imageUrl){
            res.status(400).json({error: "title, description and image are required"});
            return
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        });

        res.status(201).json(product);
    } catch(error){
        console.error("Error creation product", error);
        res.status(500).json({error: "failed to create product"});
    }
}

// updated product ( protected only owner)

export const updateProduct = async (res: Response, req: Request) => {
    try{
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({error: "Unathuories"});

        const { id } = req.params;
        const { title, description, imageUrl} = req.body;

        // check product and belong to user
        const existingProduct = await queries.getProductById("id");
        if (!existingProduct){
            return res.status(404).json({error: "product not found"});
            return
        } 
        if(existingProduct.userId !== userId) {
            res.status(403).json({error: "You can update only you product"});
            return;
        }

        const product = await queries.updateProduct("id", {
            title,
            description,
            imageUrl
        });
        res.status(200).json(product);
    } catch(error){
        console.error("Error updating product", error);
        res.status(500).json({error: "Failed to updaed product!"})
    }
}

//Delete Product ( protected only owner )

export const deleteProduct = async (res: Response, req: Request) => {
    try{
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({error: "Unathuories"});

        const { id } = req.params;
        // check product and belong to user
        const existingProduct = await queries.getProductById("id");
        if (!existingProduct){
            return res.status(404).json({error: "product not found"});
            return
        } 
        if(existingProduct.userId !== userId) {
            res.status(403).json({error: "You can update only you product"});
            return;
        }

        await queries.deleteProduct("id");
        res.status(200).json({message: "Product deleted successfully"});
    } catch(error) {
        console.error("Error deleting product", error);
        res.status(500).json({error: "Failed to delete product!"})
    }
}