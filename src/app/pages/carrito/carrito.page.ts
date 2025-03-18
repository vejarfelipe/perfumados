import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/carrito.service'; // Importa el servicio del carrito
import { PerfumeService } from 'src/app/services/perfume.service'; // Importa el servicio de perfumes
import { addIcons } from 'ionicons'; // Importa addIcons para usar iconos
import { homeOutline } from 'ionicons/icons'; // Importa el ícono de home

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonList, IonItem, IonLabel, IonButton, IonIcon],
})
export class CarritoPage implements OnInit {
  cartItems: any[] = []; // Items del carrito

  constructor(
    private cartService: CartService,
    private perfumeService: PerfumeService, // Inyecta el servicio de perfumes
    private router: Router // Inyecta Router
  ) {
    addIcons({ homeOutline }); // Añade el ícono de home
  }

  ngOnInit() {
    // Obtener los items del carrito al iniciar la página
    this.cartItems = this.cartService.getCartItems();
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

    // Redirigir al home
    this.router.navigate(['/home']);
  }
}