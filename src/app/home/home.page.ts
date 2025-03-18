import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon } from '@ionic/angular/standalone';
import { PerfumeService } from '../services/perfume.service';
import { Perfume } from '../models/perfume.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/carrito.service'; // Importa el servicio del carrito
import { addIcons } from 'ionicons'; // Importa addIcons para usar iconos
import { cartOutline } from 'ionicons/icons'; // Importa el ícono de carrito

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonHeader, IonToolbar, IonTitle, 
    CommonModule, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, FormsModule, IonIcon],
})
export class HomePage implements OnInit {
  perfumes: Perfume[] = []; // Lista de perfumes
  filteredPerfumes: Perfume[] = []; // Lista de perfumes filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private router: Router,
    private perfumeService: PerfumeService,
    private cartService: CartService // Inyecta el servicio del carrito
  ) {
    addIcons({ cartOutline }); // Añade el ícono de carrito
  }

  ngOnInit() {
    this.loadPerfumes(); // Cargar perfumes al iniciar la página
  }

  // Cargar perfumes desde Firestore
  loadPerfumes() {
    this.perfumeService.getPerfumes().subscribe((data: Perfume[]) => {
      this.perfumes = data;
      this.filteredPerfumes = data; // Inicialmente, mostrar todos los perfumes
    });
  }

  // Filtrar perfumes por nombre
  filterPerfumes() {
    this.filteredPerfumes = this.perfumes.filter(perfume =>
      perfume.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Obtener opciones de cantidad
  getQuantityOptions(maxQuantity: number): number[] {
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }

  // Añadir al carrito
  addToCart(perfume: Perfume) {
    if (perfume.selectcantidad) {
      // Añadir el producto al carrito usando el servicio
      this.cartService.addToCart(perfume);
      console.log(`Añadido al carrito: ${perfume.name} x ${perfume.selectcantidad}`);
    } else {
      console.log('Seleccione una cantidad');
    }
  }

  // Navegar a la página de carrito
  goToCart() {
    this.router.navigate(['/carrito']);
  }

  // Navegar a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}