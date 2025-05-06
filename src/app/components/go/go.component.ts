import { Component, OnInit } from '@angular/core';
import { event } from 'devextreme/events';
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis, ApexTitleSubtitle, ApexTooltip, ApexYAxis, ApexMarkers, ApexFill, ApexAnnotations, ApexStroke, ApexDataLabels } from "ng-apexcharts";
import { GoTerm } from 'src/app/models/goTerm.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GeneConversionService } from 'src/app/services/name-converter.service';
import { Router } from '@angular/router';
import { LociService } from 'src/app/services/loci.service';
import { PathwayinfoService } from 'src/app/services/pathwayinfo.service';
import { GiniScore } from 'src/app/models/giniScore.model';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  markers: ApexMarkers;
  annotations: ApexAnnotations;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  colors?: string[];
};

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {
  // Anthony
  comparisonTypes = [
    { text: 'P1 vs P8: MI - PSD1', value: '1' },  // text is correct value, young_old is becuase i am lazy to change
    { text: 'P1 vs P8: MI - PSD3', value: '2' },
    { text: 'P1 vs P8: Sham - PSD1', value: '3' },
    { text: 'P1 vs P8: Sham - PSD3', value: '4' },
    { text: 'Sham vs MI: P1 - PSD1', value: '5' },  // text is correct value, young_old is becuase i am lazy to change
    { text: 'Sham vs MI: P1 - PSD3', value: '6' },
    { text: 'Sham vs MI: P8 - PSD1', value: '7' },
    { text: 'Sham vs MI: P8 - PSD3', value: '8' }
  ];
  selectedComparisonType: string = '1'; // Default selection
  // Anthony Done

  loading: boolean = true;
  public go_chart_options: Partial<ChartOptions>;
  public hist_chart_options: Partial<ChartOptions>;
  go_terms: GoTerm[] = [];
  term_selected = false;
  selected_term: GoTerm;
  selected_core_enrichment: string[] = []
  pathway_info: any;
  upreg_enrich_list: string[] = [];
  downreg_enrich_list: string[] = [];
  gini_scores: GiniScore[];
  gini_histogram_data: string;
  pathways: any;
  selected_search_mode: string = 'contains'
  search_modes = [
    { text: 'Name Contains', value: 'contains' },
    { text: 'Name Starts With', value: 'startsWith' }
  ];
  tissue_types: string[] = ['Heart'];
  selected_tissues: string[] = this.tissue_types
  cell_types: string[] = [
    'All Cells, Heart',
    'Cardiomyocyte',
    'Fibroblast 2',
    'Macrophage',
    'Cardiomyocyte 2',
    'Endothelial Cell 2',
    'Fibroblast 3',
    'Mural Cell',
    'Cardiomyocyte 3',
    'Endothelial Cell',
    'Fibroblast',
    'Nuclear Cardiomyocyte'
  ];
  upreg_gene_counts: { gene: string, count: string }[];
  downreg_gene_counts: { gene: string, count: string }[];
  selected_cell_types: string[] = this.cell_types
  selected_pathway: string = 'G protein-coupled receptor signaling pathway'

  constructor(private databaseService: DatabaseService, private geneConversionService: GeneConversionService, private router: Router, private lociService: LociService, private pathwayInfoService: PathwayinfoService) {
    this.databaseService.getPathways().subscribe({
      next: (data) => {
        //this.pathways = data.slice(0,100);
        this.pathways = data.sort(([, a], [, b]) => b - a);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => { }
    });
    this.databaseService.getGiniScores().subscribe({
      next: (data) => {
        this.gini_scores = data
        this.makeGiniPlot()
        this.setHistogramLines()
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => { }
    });
    this.prepareData()
  }

  ngOnInit(): void {
    this.go_chart_options = {
      series: [{
        name: 'TEST',
        data: [],
      }],
      chart: {
        height: 300,
        parentHeightOffset: 0,
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            this.selected_term = this.go_terms[opts.dataPointIndex];
            this.getGeneSymbols(this.selected_term)
            this.term_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      tooltip: {
        enabled: true,    // Enable the tooltip
        shared: false,    // Only show the tooltip for the hovered point
        intersect: true,  // Tooltip appears only on exact hover
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
          console.log(dataPoint)
          return `<div style="font-style:'Roboto'; font-size: 14px;">${dataPoint.label}</div>`;
        }
      },
      markers: {
        size: 10,
        shape: "circle"
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '16px',
            color: "#d63384"
          }
        },
        labels: {
          style: {
            colors: '#d63384',
          }
        }
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ]
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",
        }
      },
      title: {
        text: 'TEST@',
        align: "center",
        style: {
          color: '#d63384'
        }
      },
    };

    this.hist_chart_options = {
      series: [{
        name: 'Frequency',
        data: []
      }],
      chart: {
        height: 300,
        parentHeightOffset: 0,
        type: "area",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      yaxis: {
        title: {
          text: "Gini Index Frequency",
          style: {
            fontSize: '16px',
            color: '#d63384'
          }
        },
        labels: {
          style: {
            colors: '#d63384',
          }
        }
      },
      xaxis: {
        title: {
          text: "Gini Index",
          offsetY: 90,
          offsetX: -20,
          style: {
            fontSize: '20px',
            color: '#d63384'
          }
        },
        tickAmount: 10, // Attempt to set the number of ticks to 10
        labels: {
          formatter: function (value) {
            return Number(value).toFixed(1);
          },
          style: {
            colors: '#d63384',
          }
        }
      },
      tooltip: {
        x: {
          formatter: function (value) {
            return Number(value).toFixed(2); // Format x-axis tooltip values to 3 decimal places
          }
        }
      },
      stroke: {
        curve: "smooth",
        colors: ['#808080'] // Set the line color here 
      },
      colors: ['#708090'], // Set the fill color here
    };
    console.log(this.term_selected)
  }

  createDisplayData() {
    this.upreg_enrich_list = []
    this.downreg_enrich_list = []
    let go_data = [];
    let min_nes = Number.POSITIVE_INFINITY
    let max_nes = Number.NEGATIVE_INFINITY
    let max_p_val = Number.NEGATIVE_INFINITY
    for (let i = 0; i < this.go_terms.length; i++) {
      let go_term = this.go_terms[i];
      let color = this.getColorForValue(go_term.nes)
      let label = go_term.cell_type + '-' + go_term.tissue
      // let formatted_data = { x: Number(go_term.nes), y: Number(go_term.P_Value), fillColor: color, label: label };
      // anthony
      // Convert adjusted p-value to -log10(p-value)
      let pval_transformed = -Math.log10(Number(go_term.P_Value));
      let formatted_data = {
        x: Number(go_term.nes),
        y: pval_transformed,
        fillColor: color,
        label: label
      };

      go_data.push(formatted_data);
      min_nes = go_term.nes! < min_nes ? go_term.nes! : min_nes;
      max_nes = go_term.nes! > max_nes ? go_term.nes! : max_nes;
      max_p_val = go_term.P_Value > max_p_val ? go_term.P_Value : max_p_val;
      //set core enrichment values
      let enrich_list = go_term.coreenrichment.split('/')
      if (Number(go_term.nes >= 0)) {
        this.upreg_enrich_list = this.upreg_enrich_list.concat(enrich_list)
      }
      else {
        this.downreg_enrich_list = this.downreg_enrich_list.concat(enrich_list)
      }
    }
    //calculte gene prevalance
    this.countOccurrences(this.upreg_enrich_list, 'UP')
    this.countOccurrences(this.downreg_enrich_list, 'DOWN')

    min_nes = Math.floor(min_nes - 1)
    max_nes = Math.ceil(max_nes + 1)
    max_p_val = Math.ceil(max_p_val + 0.5)
    let num_ticks = max_nes - min_nes
    this.go_chart_options.series = [{ data: go_data }];
    this.go_chart_options.xaxis = {
      title: {
        text: "Normalized Enrichment Score",
        offsetY: 80,
        style: {
          fontSize: '16px',
          color: "#d63384"
        }
      },
      labels: {
        style: {
          colors: "#d63384"
        }
      },
      type: "numeric", // Ensure x-axis is numeric
      tooltip: {
        enabled: false
      },
      tickAmount: num_ticks, // Adjust the number of ticks
      min: min_nes, // Set minimum value if needed
      max: max_nes // Set maximum value if needed
    }
    this.go_chart_options.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: '#d63384'
        }
      },
      min: 0,
      max: max_p_val,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        },
        style: {
          colors: "#d63384",
        }
      }
    }
  }

  getColorForValue(value: number): string {
    // Normalize value to be between 0 and 1
    const min_value = -2;
    const max_value = 2;
    const normalizedValue = (value - min_value) / (max_value - min_value);

    // Define the colors
    const colorMidnightBlue = [25, 25, 112];
    const colorWhite = [255, 255, 255];
    const colorFirebrick = [178, 34, 34];

    // Determine position within the gradient
    let r: number, g: number, b: number;

    if (normalizedValue <= 0.5) {
      // Interpolate between Midnight Blue and White
      const percentage = normalizedValue * 2; // Map to range [0, 1]
      r = Math.round(colorMidnightBlue[0] + (colorWhite[0] - colorMidnightBlue[0]) * percentage);
      g = Math.round(colorMidnightBlue[1] + (colorWhite[1] - colorMidnightBlue[1]) * percentage);
      b = Math.round(colorMidnightBlue[2] + (colorWhite[2] - colorMidnightBlue[2]) * percentage);
    } else {
      // Interpolate between White and Firebrick Red
      const percentage = (normalizedValue - 0.5) * 2; // Map to range [0, 1]
      r = Math.round(colorWhite[0] + (colorFirebrick[0] - colorWhite[0]) * percentage);
      g = Math.round(colorWhite[1] + (colorFirebrick[1] - colorWhite[1]) * percentage);
      b = Math.round(colorWhite[2] + (colorFirebrick[2] - colorWhite[2]) * percentage);
    }

    return `rgb(${r},${g},${b})`;
  }


  getGeneSymbols(selected_term: GoTerm): void {
    let ensemble_list = selected_term.coreenrichment.split('/')
    this.geneConversionService.convertEnsemblListToGeneList(ensemble_list)
      .then((result: string[]) => {
        let selected_gene_counts = selected_term.nes > 0 ? this.upreg_gene_counts : this.downreg_gene_counts
        const geneOrderMap = new Map(selected_gene_counts.map(item => [item.gene, item.count]));
        // Filter and sort `result` based on the order in `gene_counts`
        this.selected_core_enrichment = result
          .filter(gene => geneOrderMap.has(gene)) // Keep only genes present in `gene_counts`
          .sort((a, b) => {
            const indexA = selected_gene_counts.findIndex(item => item.gene === a);
            const indexB = selected_gene_counts.findIndex(item => item.gene === b);
            return indexA - indexB;
          }).reverse();

      })
      .catch((error: any) => {
        console.error('Error converting ensemble ID to gene:', error);
      });
  }


  countOccurrences(gene_list: string[], direction: string): void {
    this.geneConversionService.convertEnsemblListToGeneList(gene_list)
      .then((result: string[]) => {
        const counts: { [gene: string]: number } = {};

        // Count occurrences
        for (const str of result) {
          counts[str] = (counts[str] || 0) + 1;
        }

        // Convert the object to an array of key-value pairs and sort them
        const sortedCounts = Object.entries(counts).sort(([, a], [, b]) => b - a);

        // Convert to array of objects
        const sortedCountsArray = sortedCounts.map(([gene, count]) => ({
          gene,
          count: ((count / this.go_terms.length) * 100).toFixed(1) + '%'
        }));
        if (direction == 'UP') {
          this.upreg_gene_counts = sortedCountsArray;
        }
        if (direction == 'DOWN') {
          this.downreg_gene_counts = sortedCountsArray;
        }
      })
      .catch((error: any) => {
        console.error('Error converting ensemble ID to gene:', error);
      });
  }

  /*geneRerout($event: any){
    console.log($event.itemData)
    this.lociService.setLocus($event.itemData)
    this.router.navigate(['/igv']);
  }*/

  // Re-wrote
  geneRerout(item: string) {
    console.log(item);
    this.lociService.setLocus(item);
    this.router.navigate(['/igv']);
  }

  getPathDisplayData() {
    this.pathwayInfoService.getPathwayInfo(this.go_terms[0].goid).subscribe({
      next: (data) => {
        this.pathway_info = data.results[0]
        this.pathway_info.name = this.pathway_info.name.replace(/\b\w/g, (char: string) => char.toUpperCase());
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => { }
    })
  }

  getColorStyle(item: any, direction: string): { [key: string]: string } {
    // Normalize value to be between 0 and 1
    let clean_count = Number(item.count.replace('%', ''))
    const min_value = 0;
    const max_value = 20;
    const normalizedValue = (clean_count - min_value) / (max_value - min_value);

    // Define the colors
    const colorMidnightBlue = [25, 25, 112];
    const colorSkyBlue = [135, 206, 250];
    const colorFirebrick = [178, 34, 34];
    const colorRose = [240, 128, 128];


    // Determine position within the gradient
    let r: number, g: number, b: number;

    if (direction == 'DOWN') {
      // Interpolate between Midnight Blue and White
      const percentage = normalizedValue * 2; // Map to range [0, 1]
      r = Math.round(colorSkyBlue[0] + (colorMidnightBlue[0] - colorSkyBlue[0]) * percentage);
      g = Math.round(colorSkyBlue[1] + (colorMidnightBlue[1] - colorSkyBlue[1]) * percentage);
      b = Math.round(colorSkyBlue[2] + (colorMidnightBlue[2] - colorSkyBlue[2]) * percentage);
    } else {
      // Interpolate between White and Firebrick Red
      const percentage = (normalizedValue - 0.5) * 2; // Map to range [0, 1]
      r = Math.round(colorRose[0] + (colorFirebrick[0] - colorRose[0]) * percentage);
      g = Math.round(colorRose[1] + (colorFirebrick[1] - colorRose[1]) * percentage);
      b = Math.round(colorRose[2] + (colorFirebrick[2] - colorRose[2]) * percentage);
    }
    return { color: `rgb(${r},${g},${b})` };
  }

  prepareData() {

    this.databaseService.getGoTerms(this.selected_tissues, this.selected_cell_types, this.selected_pathway, this.selectedComparisonType)
      .subscribe({
        next: (data) => {
          this.go_terms = data;
          console.log(this.go_terms)
          this.createDisplayData();
          this.getPathDisplayData();
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => { }
      });
  }

  makeGiniPlot() {
    const numBins = 100;
    const binCounts: number[] = Array(numBins).fill(0);
    // Count occurrences in bins
    for (const gini_score of this.gini_scores) {
      if (gini_score.UpGini != -1) {
        const upBin = Math.min(Math.floor(gini_score.UpGini! * numBins), numBins - 1);
        binCounts[upBin]++;
      }
      if (gini_score.DownGini != -1) {
        const downBin = Math.min(Math.floor(gini_score.DownGini! * numBins), numBins - 1);
        binCounts[downBin]++;
      }
      if (gini_score.DownGini === 1 || gini_score.UpGini === 1) {
      }
    }

    // Convert binCounts to plotData array with {x, y}
    const plotData = binCounts.map((count, index) => ({
      x: index / (numBins - 1),  // x should be from 0 to 1
      y: count
    }));

    // Update chart options
    this.hist_chart_options.series = [{ data: plotData }];
  }

  setHistogramLines() {
    let selected_gini_score = this.gini_scores.find(item => item.pathway === "\"" + this.selected_pathway + "\"");
    this.hist_chart_options.annotations = {
      xaxis: [
        {
          x: selected_gini_score?.UpGini,
          borderColor: '#B22222', // Color of the first upreg value
          borderWidth: 5
        },
        {
          x: selected_gini_score?.DownGini,
          borderColor: '#003366', // Color of the downreg upreg value
          borderWidth: 5,
        }
      ]
    }
  }

  getNewData() {
    this.loading = true;
    this.term_selected = false;
    console.log(this.loading)
    this.prepareData()
    this.setHistogramLines()
  }

  onSearchModeChanged(event: any): void {
    console.log('Selected Search Mode:', event.value);
    // Handle search mode change
  }




  onTissuesChanged($event: any) {
    this.selected_tissues = $event.value
  }
  onCellsChanged($event: any) {
    this.selected_cell_types = $event.value
  }
  onPathwayChange($event: any) {
    this.selected_pathway = $event.value;
  }
}
