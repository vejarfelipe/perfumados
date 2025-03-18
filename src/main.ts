import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from './environments/environment'; // Asegúrate de importar el entorno correcto

bootstrapApplication(AppComponent, {
  providers: [
    // Configuración de Angular y Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Configuración de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Inicializa Firebase App
    provideAuth(() => getAuth()), // Proporciona el servicio de autenticación
    provideFirestore(() => getFirestore()), // Proporciona el servicio de Firestore
    provideStorage(() => getStorage()), // Proporciona el servicio de Storage
  ],
});