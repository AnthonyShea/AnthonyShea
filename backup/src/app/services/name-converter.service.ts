import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneConversionService {

  private ensembleToGeneMapping: { [key: string]: string } = {};
  private mappingsLoadedSubject = new BehaviorSubject<boolean>(false);
  mappingsLoaded$ = this.mappingsLoadedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMappings().then((mapping) => {
      this.ensembleToGeneMapping = mapping;
      this.mappingsLoadedSubject.next(true);
    });
  }

  private async loadMappings(): Promise<{ [key: string]: string }> {
    try {
      const mapping = await this.http.get<{ [key: string]: string }>('/assets/geneDict.json').toPromise();
      console.log('Mappings loaded successfully');
      return mapping || {}; // Provide a default value in case mapping is undefined
    } catch (error) {
      console.error('Error loading gene mappings:', error);
      return {};
    }
  }

  async convertEnsembleToGene(ensembleId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.mappingsLoaded$.pipe(
        filter(loaded => loaded), // Wait until mappings are loaded
        take(1) // Take the first value and complete the observable
      ).subscribe(() => {
        if (ensembleId in this.ensembleToGeneMapping) {
          resolve(this.ensembleToGeneMapping[ensembleId]);
        } else {
          reject('Gene not found');
        }
      });
    });
  }

  async convertEnsemblListToGeneList(ensembleIds: string[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.mappingsLoaded$.pipe(
        filter(loaded => loaded), // Wait until mappings are loaded
        take(1) // Take the first value and complete the observable
      ).subscribe(() => {
        const geneNames: string[] = [];
        const promises = ensembleIds.map(ensembleId => {
          return new Promise<string>((resolve, reject) => {
            if (ensembleId in this.ensembleToGeneMapping) {
              resolve(this.ensembleToGeneMapping[ensembleId]);
            } else {
              reject(`Gene not found for Ensembl ID: ${ensembleId}`);
            }
          });
        });
  
        Promise.all(promises)
          .then(results => {
            resolve(results);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
  
}
