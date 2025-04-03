export class GoTerm {
  pathway: string;
  goid: string;
  nes: number;
  P_Value: number;
  coreenrichment: string;
  cell_type: string;
  tissue: string;
  pmid: number;

  constructor(pathway: string, goid: string, nes: number, P_Value: number, coreenrichment: string, cell_type: string, tissue: string, pmid: number) {
    this.pathway = pathway;
    this.goid = goid;
    this.nes = nes;
    this.P_Value = P_Value;
    this.coreenrichment = coreenrichment;
    this.cell_type = cell_type;
    this.tissue = tissue;
    this.pmid = pmid;
  }
}
