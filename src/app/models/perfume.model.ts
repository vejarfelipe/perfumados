export interface Perfume {
    id?: string; // Opcional, Firestore lo genera automáticamente
    name: string;
    brand: string;
    description: string;
    imageUrl: string;
    cantidad: number;
    selectcantidad?: number;
    precio?: number;
  }