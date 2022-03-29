import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface IMaterial {
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

  public getMaterials(): Promise<IMaterial[]> {
    return this.http.get<IMaterial[]>(`${environment.db_root}/materials`).toPromise()
  }
}
