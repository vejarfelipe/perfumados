import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText, CommonModule, FormsModule],
})
export class RegisterPage implements OnInit {
  email: string = ''; // Correo electrónico del usuario
  password: string = ''; // Contraseña del usuario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  // Registrar un nuevo usuario
  async register() {
    try {
      await this.authService.register(this.email, this.password);
      console.log('Usuario registrado correctamente');
      this.router.navigate(['/home']); // Redirige al home después del registro
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. Por favor, intenta nuevamente.'); // Muestra un mensaje de error
    }
  }

  // Redirigir a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}