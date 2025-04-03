export class GiniScore {
    pathway?: string;
    UpGini?: number;
    DownGini?: number;
    

    constructor(pathway: string, UpGini: number, DownGini: number) {
      this.pathway = pathway;
      this.UpGini = UpGini;
      this.DownGini = DownGini;
    }
  }