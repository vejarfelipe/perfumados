import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  // Iniciar sesión con correo y contraseña
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
      this.router.navigate(['/home']); // Redirige al home después del login
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  // Registrar un nuevo usuario
  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      this.router.navigate(['/home']); // Redirige al home después del registro
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada');
      this.router.navigate(['/login']); // Redirige al login después del logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.auth.currentUser;
  }
}