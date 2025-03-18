import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonThumbnail, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/services/carrito.service';
import { PerfumeService } from 'src/app/services/perfume.service';
import { addIcons } from 'ionicons';
import { homeOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail, IonInput, FormsModule],
})
export class CarritoPage implements OnInit {
  cartItems: any[] = []; // Items del carrito
  total: number = 0; // Total de la compra

  constructor(
    private cartService: CartService,
    private perfumeService: PerfumeService,
    private router: Router
  ) {
    addIcons({ homeOutline, trashOutline }); // Añade los íconos
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  // Calcular el total de la compra
  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.precio * item.selectcantidad, 0);
  }

  // Actualizar el total cuando cambia la cantidad
  updateTotal() {
    this.calculateTotal();
  }

  // Eliminar un producto del carrito
  removeItem(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  // Regresar al home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Finalizar la compra
  checkout() {
    // Descontar las unidades compradas del inventario
    this.cartItems.forEach(item => {
      this.perfumeService.updatePerfumeQuantity(item.id, item.selectcantidad);
    });

    // Mostrar mensaje de felicitaciones
    alert('¡Felicidades por la compra!');

    // Limpiar el carrito
    this.cartService.clearCart();
    this.cartItems = []; // Limpiar la lista local
    this.total = 0; // Reiniciar el total

    // Redirigir al home
    this.router.navigate(['/home']);
  }
}