// pathway-info.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathwayinfoService {

  private apiUrl = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/terms/';

  constructor(private http: HttpClient) { }

  getPathwayInfo(goid: string): Observable<any> {
    /* return from(fetch(`/proxy?id=${goid}`)).pipe(
      switchMap(response => response.json())
    ); */
    return this.http.get<any>(`${this.apiUrl}${goid}`);
  }
}
