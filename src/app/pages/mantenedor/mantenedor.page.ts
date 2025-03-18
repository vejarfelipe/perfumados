import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonThumbnail, IonTextarea, IonSearchbar, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { PerfumeService } from '../../services/perfume.service';
import { Perfume } from '../../models/perfume.model';

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonThumbnail, IonTextarea, IonSearchbar, CommonModule, FormsModule],
})
export class MantenedorPage implements OnInit {
  perfumes: Perfume[] = [];
  filteredPerfumes: Perfume[] = [];
  perfume: Perfume = { name: '', brand: '', description: '', imageUrl: '', cantidad: 0, precio: 0 };
  isEditing = false;
  searchTerm = '';

  constructor(private perfumeService: PerfumeService, private router: Router) {}

  ngOnInit() {
    this.loadPerfumes();
  }

  // Cargar la lista de perfumes
  async loadPerfumes() {
    this.perfumeService.getPerfumes().subscribe((data) => {
      this.perfumes = data;
      this.filteredPerfumes = data;
    });
  }

  // Filtrar perfumes por nombre
  filterPerfumes() {
    this.filteredPerfumes = this.perfumes.filter(perfume =>
      perfume.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Regresar al home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Agregar un nuevo perfume
  async addPerfume() {
    await this.perfumeService.addPerfume(this.perfume);
    this.resetForm();
    this.loadPerfumes();
  }

  // Editar un perfume existente
  editPerfume(perfume: Perfume) {
    this.perfume = { ...perfume };
    this.isEditing = true;
  }

  // Actualizar un perfume
  async updatePerfume() {
    if (this.perfume.id) {
      await this.perfumeService.updatePerfume(this.perfume.id, this.perfume);
      this.resetForm();
      this.loadPerfumes();
    }
  }

  // Eliminar un perfume
  async deletePerfume(id: string) {
    await this.perfumeService.deletePerfume(id);
    this.loadPerfumes();
  }

  // Reiniciar el formulario
  resetForm() {
    this.perfume = { name: '', brand: '', description: '', imageUrl: '', cantidad: 0, precio: 0 };
    this.isEditing = false;
  }
}