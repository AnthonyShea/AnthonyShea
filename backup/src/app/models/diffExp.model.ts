export class DiffExp {
    gene?: string | number;
    pmid?: number;
    cell_type?: string;
    cell_type2?: string;
    cell_type3?: string;
    lfc?: number;
    slope?: number;
    inter?: number;
    p_value?: number;
    plotting_id?: number;
    natal_status: string;
    PSD: number;
    Surgery: string;
    Comparison: string;

    constructor(gene: string | number, pmid: number,cell_type: string, cell_type2: string, cell_type3: string, lfc: number, slope: number, inter: number, p_value: number, plotting_id: number, natal_status: string, PSD: number, Surgery: string, Comparison: string) {
      this.gene = gene;
      this.pmid = pmid;
      this.cell_type = cell_type;
      this.cell_type2 = cell_type2;
      this.cell_type3 = cell_type3;
      this.lfc = lfc;
      this.slope = slope;
      this.inter = inter;
      this.p_value= p_value;
      this.plotting_id = plotting_id;
      this.natal_status = natal_status;
      this.PSD = PSD;
      this.Surgery = Surgery;
      this.Comparison = Comparison;
    }
  }