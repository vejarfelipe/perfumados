import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonInput,IonButton, IonLabel,IonItem,IonCardContent,IonCardTitle, IonText } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonInput, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, 
    IonItem, IonLabel, IonButton, CommonModule, FormsModule, IonCardContent, IonCardTitle]
})
export class LoginPage implements OnInit {

  constructor( private authService: AuthService,
     private router: Router,
    ) { }
  email: string = '';
  password: string = '';

  ngOnInit() {
  }
  async login() {
    try {
      await this.authService.login(this.email, this.password);

      // Verifica si el correo es "admin@admin.cl"
      if (this.email === 'admin@admin.cl') {
        this.router.navigate(['/mantenedor']); // Redirige al mantenedor
      } else {
        this.router.navigate(['/home']); // Redirige a la página principal
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas. Inténtalo de nuevo.'); // Mensaje de error
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}