
import { Router } from "express";
import CartManager from "../managers/cart.manager.js";
const cartManager = new CartManager("./carts.json");

const router = Router();


router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addoUpdate(cid, pid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await cartManager.deleteCartById(cid);
    res.status(200).json({ message: `Cart id: ${cid} deleted successfully` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
