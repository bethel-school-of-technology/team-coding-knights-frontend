import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Material {
  material_id: number;
  material_name: string;
  material_price: number;
  material_set_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private http: HttpClient) { }

  /**
   * fetch all materials in the backend
   */
  public getMaterials(): Promise<Material[]> {
    return this.http.get<Material[]>(`${environment.db_root}/materials`).toPromise()
  }
}
