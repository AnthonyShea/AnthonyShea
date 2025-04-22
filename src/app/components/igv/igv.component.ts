import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
//import * as igv from 'igv'
import igv from 'node_modules/igv/dist/igv.esm.js'
import { Positions } from 'src/app/models/positions.model';
import { DatabaseService } from 'src/app/services/database.service';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { DiffExp } from 'src/app/models/diffExp.model';
import { Indices } from 'src/app/models/indices.model';
import { DatabaseConstsService } from 'src/app/services/database-consts.service';
import { LociService } from 'src/app/services/loci.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle
};

@Component({
  selector: 'app-igv',
  templateUrl: './igv.component.html',
  styleUrls: ['./igv.component.css']
})
export class IgvComponent implements AfterViewInit, OnDestroy {
  @ViewChild('igvdiv') igvDiv!: ElementRef;
  @ViewChild('temp') temp!: ElementRef;
  @ViewChild("chart") chart: ChartComponent;

  //to_child = new DiffExp('TEST GENE', ['1','2','3'],['2','3','4'],['0','1','2'],['1,1,1'],['1,1,1'])
  //IGV Variables
  browser: any;
  // trackUrl = 'https://www.encodeproject.org/files/ENCFF356YES/@@download/ENCFF356YES.bigWig'
  trackUrl = 'https://www.encodeproject.org/files/ENCFF092EKO/@@download/ENCFF092EKO.bigWig';
  options = {
    genome: "mm10",
    locus: 'chr8:5727233-17181696',
    tracks: [
      {
        name: 'Histone CHIP-seq (H3K27ac) : Heart Tissue Postnatal (0 days)',
        type: 'wig',
        format: 'bigWig',
        // url: this.trackUrl,
        url: 'https://www.encodeproject.org/files/ENCSR675HDX/@@download/ENCSR675HDX.bigWig',
        color: '#0078d7',
        autoscaleGroup: 'hist'
      }, // Add methylation marks
      {
        name: 'WGBS : Heart Tissue Postnatal (0 days)',
        type: 'wig',
        format: 'bigWig',
        // url: this.trackUrl,
        url: 'https://www.encodeproject.org/files/ENCSR397YEG/@@download/ENCSR397YEG.bigWig',
        color: '#97fce2',
        autoscaleGroup: 'meth'
      }
    ],
  };

  //Chart Variables
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  tissue_types: string[] = [];
  cell_types: string[] = [];

  selected_tissues: string[] = [];
  selected_cells: string[] = [];

  //Other Variables
  display?: Positions[];
  original_genes: DiffExp[];
  genes: DiffExp[] = [];
  grouped_genes: DiffExp[][] = [];
  original_grouped_genes: DiffExp[][] = [];
  selected_indices: Indices[];
  original_indices: Indices[];
  pmid_tissue_dist: { [key: string]: number[] } = {}
  gene_names: string[] = [];
  found = false;
  loading: boolean = false;


  constructor(private databaseService: DatabaseService, databaseConstService: DatabaseConstsService, private lociService: LociService) {
    this.cell_types = databaseConstService.getDECellTypes();
    this.selected_cells = this.cell_types;
    this.pmid_tissue_dist = databaseConstService.getDePmidTissueDict();
    this.tissue_types = Object.keys(this.pmid_tissue_dist)
    this.selected_tissues = this.tissue_types;
    this.databaseService.getIndices().subscribe({
      next: (data) => {
        this.selected_indices = data;
        this.original_indices = data;
      },
      error: (e) => console.error(e)
    });
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "Study 1",
              y: [
                1, 3
              ]
            },
            {
              x: "Study 2",
              y: [
                2, 4
              ]
            },
            {
              x: "Study 3",
              y: [
                3, 5
              ]
            },
            {
              x: "Study 4",
              y: [
                4, 6
              ]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "numeric"
      },
      title: {
        text: "Proof of Concept",
        align: "center"
      }
    };
  }

  ngAfterViewInit() {
    let loci = this.lociService.getLocus()

    if (loci != null) {
      this.options = {
        genome: "mm39",
        locus: loci,
        tracks: [
          {
            name: 'mCG',
            type: 'wig',
            format: 'bigWig',
            url: this.trackUrl,
            color: '#4a90e2',
            autoscaleGroup: 'meth'
          }
        ],
      };
      this.lociService.setLocus(null)
    }
    this.createBrowser();
    console.log(this.lociService.getLocus())
  }

  async createBrowser() {
    try {
      this.browser = await igv.createBrowser(this.igvDiv.nativeElement, this.options)
      //this.addTrackByUrl()
    } catch (e) {
      console.log(e)
    }
  }
  addTrackByUrl() {
    this.browser.loadTrack({
      url: this.trackUrl,
    })
  }
  getInRangeGenes() {
    this.loading = true
    const loci = this.browser.currentLoci().split(':');
    const chr = loci[0].replace('chr', '')
    const start = Math.floor(loci[1].split('-')[0])
    const end = Math.ceil(loci[1].split('-')[1])
    this.databaseService.getInRangeGenes(start, end, chr)
      .subscribe({
        next: (data) => {
          this.display = data;
          this.getDiffExpData()
        },
        error: (e) => console.error(e)
      });
  }

  getDiffExpData() {
    this.gene_names = this.display!.map((obj) => obj.en_id!)
    const convertedList: number[] = this.gene_names.map((str) => {
      // Remove 'ENSG' from the beginning of each string
      const strippedString = str.replace('ENSMUSG', '');
      // Convert the remaining string to a number
      return parseInt(strippedString, 10);
    });

    this.databaseService.getGeneDiffExp(convertedList)
      .subscribe({
        next: (data) => {
          this.original_genes = data;
          this.genes = data;
          this.original_grouped_genes = this.convertDiffExpData(this.original_genes)
          this.subsetCorrectCellAndTissueTypes()
          console.log(this.grouped_genes)

          //this.original_genes = this.assignGeneNames(this.original_genes)
          //this.genes = this.assignGeneNames(this.genes)
          // this.original_genes = this.prettyOrderer(this.original_genes)
          // this.genes = this.prettyOrderer(this.genes)
        },
        error: (e) => {
          console.error(e)
          this.loading = false;
          alert('Too Many or Too Few Genes Selected, Please Adjust Search Region')
        },
        complete: () => {
          this.loading = false
          this.found = true
        }
      });
  }
  ngOnDestroy() {
    igv.removeAllBrowsers()
  }

  convertDiffExpData(gene_list: any[]) {
    for (let i = 0; i < gene_list.length; i++) {
      let original_name = gene_list[i].gene
      let temp_string = "00000000000" + original_name.toString()
      let gene_name = "ENSMUSG" + temp_string.slice(-11)
      gene_list[i].gene = gene_name
    }
    let groupedLists: { [gene: string]: DiffExp[] } = gene_list.reduce((acc, obj) => {
      if (!acc[obj.gene]) {
        acc[obj.gene] = [];
      }
      acc[obj.gene].push(obj);
      return acc;
    }, {} as { [gene: string]: DiffExp[] });

    // Convert the object to an array of arrays
    return (Object.values(groupedLists));
  }

  subsetCorrectCellAndTissueTypes() {
    this.grouped_genes = JSON.parse(JSON.stringify(this.original_grouped_genes));

    let selected_pmids: number[] = [];
    for (const key in this.pmid_tissue_dist) {
      if (this.selected_tissues.includes(key)) {
        selected_pmids.push(...this.pmid_tissue_dist[key]);
      }
    }
    for (let i = this.grouped_genes.length - 1; i >= 0; i--) {
      let geneset = this.grouped_genes[i];
      for (let j = geneset.length - 1; j >= 0; j--) {
        let gene = geneset[j];
        let cleaned_celltype = gene.cell_type?.replace(/\s+\d+$/, '');
        if (gene.cell_type?.includes('All')) {
          continue;
        }
        if (!this.selected_cells.includes(cleaned_celltype!) || !selected_pmids.includes(gene.pmid!)) {
          console.log('Splicing');
          this.grouped_genes[i].splice(j, 1);
        }
      }
    }
  }



  //  assignGeneNames(gene_list:DiffExp[]){
  //   let id_name_map = new Map<string|undefined,string|undefined>();
  //   this.display?.map(item => id_name_map.set(item.en_id,item.gene_name));
  //   for(let i = 0; i<gene_list.length; i++){
  //     let id: string|undefined = gene_list[i].gene
  //     let name = id_name_map.get(id)
  //     if(name != ''){
  //       gene_list[i].gene = name
  //     }
  //   }
  //   return(gene_list)
  //  }

  onTissuesChanged($event: any) {
    this.selected_tissues = $event.value
  }

  onCellChanged($event: any) {
    this.selected_cells = $event.value
  }

  // applyFilter(){
  //   let new_indices = []
  //   for(let i = 0; i< this.original_indices.length; i++){
  //     if(this.selected_tissues.includes(this.original_indices[i].tissue_type!) && this.selected_cells.includes(this.original_indices[i].cell_type!)){
  //       new_indices.push(i)
  //     }
  //   }
  //   let filtered_genes = [];
  //   console.log(this.original_genes)
  //   for(let i = 0; i<this.original_genes.length; i++){
  //     let gene = this.original_genes[i]
  //     let temp = new DiffExp(
  //       gene.gene!,
  //       this.reorder(gene.fixed_effect, new_indices),
  //       this.reorder(gene.conf_high, new_indices),
  //       this.reorder(gene.conf_low, new_indices),
  //       this.reorder(gene.y_int, new_indices),
  //       this.reorder(gene.p_val, new_indices)
  //     )
  //     filtered_genes.push(temp)
  //   }
  //   console.log(filtered_genes)
  //   this.genes = filtered_genes
  //   this.selected_indices = this.reorder(this.original_indices, new_indices)
  // }

  reorder(list: any, ids: any) {
    let new_list = []
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      new_list.push(list[id])
    }
    return (new_list)
  }

  getEN_ID(gene: string | number | undefined) {
    for (let i = 0; i < this.display!.length; i++) {
      let position = this.display![i]
      if (position.en_id == gene || position.gene_name == gene) {
        return (position.en_id)
      }
    }
    return ('ERROR NO GENE OF THIS NAME FOUND')
  }

  // prettyOrderer(diff_list: DiffExp[]){
  //   let named_list = []
  //   let ensg_list = []
  //   for(let i = 0; i<diff_list.length; i++){
  //     let item = diff_list[i]
  //     if(item.gene!.startsWith('ENSG')){
  //       ensg_list.push(item)
  //     }
  //     else{
  //       named_list.push(item)
  //     }
  //   }
  //   named_list.sort((a, b) => (a.gene! > b.gene!) ? 1 : -1)
  //   ensg_list.sort((a, b) => (a.gene! > b.gene!) ? 1 : -1)
  //   return(named_list.concat(ensg_list))
  // }
}
