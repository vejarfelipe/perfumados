import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Perfume } from '../models/perfume.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<Perfume[]>([]);
  currentCartItems = this.cartItems.asObservable();

  constructor() {}

  // Añadir un producto al carrito
  addToCart(perfume: Perfume) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find((item) => item.id === perfume.id);

    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      existingItem.selectcantidad = (existingItem.selectcantidad || 0) + (perfume.selectcantidad || 0);
    } else {
      // Si no está en el carrito, añádelo
      currentItems.push({ ...perfume });
    }

    this.cartItems.next(currentItems);
  }

  // Obtener los items del carrito
  getCartItems(): Perfume[] {
    return this.cartItems.getValue();
  }

  // Limpiar el carrito
  clearCart() {
    this.cartItems.next([]);
  }
}