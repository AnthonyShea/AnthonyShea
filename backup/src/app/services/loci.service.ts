import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LociService {
  private locus: string | null = null;

  setLocus(locus: string | null) {
    this.locus = locus;
  }

  getLocus(): string | null {
    return this.locus;
  }
}
