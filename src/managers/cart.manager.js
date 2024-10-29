

import fs from "node:fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./product.manager.js"

export default class CartManager {

  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(carts);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      const newCart = { id: uuidv4(), products: [] };
      const carts = await this.getCarts();
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === id);
      if (!cart) throw new Error("Cart not found");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addoUpdate(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) throw new Error("Cart not found");

      const productExists = await ProductManager.exists(pid);
      if (!productExists) throw new Error("Product not found");

      const productInCart = cart.products.find(product => product.id === pid);
      if (productInCart) {
        productInCart.quantity++;
      } else {
        cart.products.push({ id: pid, quantity: 1 });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCartById(id) {
    try {
      const carts = await this.getCarts();
      const newArray = carts.filter(cart => cart.id !== id);
      if (newArray.length === carts.length) throw new Error("Cart not found");
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
