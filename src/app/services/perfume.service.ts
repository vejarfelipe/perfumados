import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, runTransaction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Perfume } from '../models/perfume.model';

@Injectable({
  providedIn: 'root',
})
export class PerfumeService {
  constructor(private firestore: Firestore) {}

  // Obtener todos los perfumes
  getPerfumes(): Observable<Perfume[]> {
    const perfumesRef = collection(this.firestore, 'perfumes');
    return collectionData(perfumesRef, { idField: 'id' }) as Observable<Perfume[]>;
  }

  // Agregar un nuevo perfume
  async addPerfume(perfume: Perfume): Promise<void> {
    const perfumesRef = collection(this.firestore, 'perfumes');
    await addDoc(perfumesRef, perfume);
  }

  // Actualizar un perfume
  async updatePerfume(id: string, perfume: Partial<Perfume>): Promise<void> {
    const perfumeDoc = doc(this.firestore, `perfumes/${id}`);
    await updateDoc(perfumeDoc, perfume);
  }

  // Eliminar un perfume
  async deletePerfume(id: string): Promise<void> {
    const perfumeDoc = doc(this.firestore, `perfumes/${id}`);
    await deleteDoc(perfumeDoc);
  }

  // Actualizar la cantidad de un perfume (descontar unidades vendidas)
  async updatePerfumeQuantity(perfumeId: string, quantitySold: number): Promise<void> {
    const perfumeRef = doc(this.firestore, `perfumes/${perfumeId}`);

    await runTransaction(this.firestore, async (transaction) => {
      const perfumeDoc = await transaction.get(perfumeRef);
      if (!perfumeDoc.exists()) {
        throw new Error('El perfume no existe');
      }

      const currentQuantity = perfumeDoc.data()!['cantidad'];
      const newQuantity = currentQuantity - quantitySold;

      if (newQuantity < 0) {
        throw new Error('No hay suficiente stock');
      }

      transaction.update(perfumeRef, { cantidad: newQuantity });
    });
  }
}