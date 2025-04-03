// pathway-info.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathwayinfoService {

  private apiUrl = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/terms/';

  constructor(private http: HttpClient) { }

  getPathwayInfo(goid: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/${goid}`);
  }
}
