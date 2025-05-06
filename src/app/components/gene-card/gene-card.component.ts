import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis, ApexTitleSubtitle, ApexTooltip, ApexYAxis, ApexMarkers, ApexFill, ApexAnnotations } from "ng-apexcharts";
import { DiffExp } from 'src/app/models/diffExp.model';
import { Indices } from 'src/app/models/indices.model';
import { MapsComponent } from '../maps/maps.component';
import { GeneConversionService } from '../../services/name-converter.service';
import { CommonModule } from '@angular/common';

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
  colors?: string[]; // Add colors property
};

@Component({
  selector: 'app-gene-card',
  templateUrl: './gene-card.component.html',
  styleUrls: ['./gene-card.component.css']
})

export class GeneCardComponent implements OnInit {
  @Input() gene_list: DiffExp[];
  @Input() indices!: Indices[];
  //@Input() en_id!: string | undefined;
  @ViewChild('child') child: MapsComponent;

  // public meta_chart_options: Partial<ChartOptions>;
  // public model_chart_options: Partial<ChartOptions>;
  public meta_chart_options1_Sham: Partial<ChartOptions>;
  public model_chart_options1_Sham: Partial<ChartOptions>;
  public meta_chart_options3_Sham: Partial<ChartOptions>;
  public model_chart_options3_Sham: Partial<ChartOptions>;
  public meta_chart_options1_MI: Partial<ChartOptions>;
  public model_chart_options1_MI: Partial<ChartOptions>;
  public meta_chart_options3_MI: Partial<ChartOptions>;
  public model_chart_options3_MI: Partial<ChartOptions>;
  public meta_chart_options: Partial<ChartOptions>;
  public model_chart_options: Partial<ChartOptions>;
  public meta_chart_optionsP1_1: Partial<ChartOptions>;
  public model_chart_optionsP1_1: Partial<ChartOptions>;
  public meta_chart_optionsP1_3: Partial<ChartOptions>;
  public model_chart_optionsP1_3: Partial<ChartOptions>;
  public meta_chart_optionsP8_1: Partial<ChartOptions>;
  public model_chart_optionsP8_1: Partial<ChartOptions>;
  public meta_chart_optionsP8_3: Partial<ChartOptions>;
  public model_chart_optionsP8_3: Partial<ChartOptions>;
  to_map: any;
  avg_fixed_effect: String;
  avg_p_val: String;
  temp: DiffExp[] = [];
  num_studies: Number;
  en_id: string;
  sig_up_color: string = '#FF5733'
  sli_up_color: string = '#FFC300'
  no_change_color: string = '#4CAF50'
  sli_dn_color: string = '#00BCD4'
  sig_dn_color: string = '#9C27B0'
  no_sig_fit_color: string = '#000000'
  lfc_sig_cutoff = 0.0116
  lfc_minor_sig_cutoff = 0.0037


  model_selected = false;
  constructor(private geneConversionService: GeneConversionService) { }

  makeid(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ngOnInit(): void {
    //sort by fixed effect size
    //this.cleanArrays();
    this.num_studies = this.getNumUniqueStudies()
    this.temp.push(this.gene_list[0])
    let temp_string = "00000000000" + this.gene_list[0].gene?.toString()
    this.en_id = "ENSMUSG" + temp_string.slice(-11)

    this.geneConversionService.convertEnsembleToGene(this.en_id).then((result: string) => {
      this.en_id = result == "" ? this.en_id : result;
      /*if(this.en_id.length<15){
        this.en_id += ' '.repeat(15-this.en_id.length)
      }*/
    }).catch((error: any) => {
      console.error('Error converting ensemble ID to gene:', error);
    });


    this.meta_chart_options1_Sham = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };

    this.meta_chart_options1_MI = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };

    this.model_chart_options1_Sham = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            console.log("Cluster Clicked - DataPoint Index:", opts.dataPointIndex);
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === 'Sham');
            let slected_gene = psd1_genes[opts.dataPointIndex];


            //let slected_gene = this.gene_list[opts.dataPointIndex]
            // Debug: Log what gene is being selected
            console.log("Selected Gene Data:", slected_gene);



            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };

    this.model_chart_options1_MI = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            console.log("Cluster Clicked - DataPoint Index:", opts.dataPointIndex);
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === 'MI');
            let slected_gene = psd1_genes[opts.dataPointIndex];


            //let slected_gene = this.gene_list[opts.dataPointIndex]
            // Debug: Log what gene is being selected
            console.log("Selected Gene Data:", slected_gene);



            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        axisBorder: {
          color: "#0d6efd"
        },
        axisTicks: {
          color: "#0d6efd"
        },
        labels: {
          style: {
            colors: "#0d6efd",
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '16px',
          }
        },
        labels: {
          style: {
            colors: "#0d6efd",
          }
        },
        axisBorder: {
          color: "#0d6efd"
        },
        axisTicks: {
          color: "#0d6efd"
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };



    this.meta_chart_options3_MI = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };

    this.meta_chart_options3_Sham = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };


    this.model_chart_options3_Sham = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === 'Sham');
            let slected_gene = psd1_genes[opts.dataPointIndex];
            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };

    this.model_chart_options3_MI = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === 'MI');
            let slected_gene = psd1_genes[opts.dataPointIndex];
            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };




    this.meta_chart_optionsP1_1 = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };

    this.meta_chart_optionsP1_3 = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };

    this.model_chart_optionsP1_1 = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            console.log("Cluster Clicked - DataPoint Index:", opts.dataPointIndex);
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === '' && gene.natal_status === 'P1' && gene.Comparison === 'ShamvsMI');
            let slected_gene = psd1_genes[opts.dataPointIndex];


            //let slected_gene = this.gene_list[opts.dataPointIndex]
            // Debug: Log what gene is being selected
            console.log("Selected Gene Data:", slected_gene);



            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };

    this.model_chart_optionsP1_3 = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            console.log("Cluster Clicked - DataPoint Index:", opts.dataPointIndex);
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === '' && gene.natal_status === 'P1' && gene.Comparison === 'ShamvsMI');
            let slected_gene = psd1_genes[opts.dataPointIndex];


            //let slected_gene = this.gene_list[opts.dataPointIndex]
            // Debug: Log what gene is being selected
            console.log("Selected Gene Data:", slected_gene);



            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };



    this.meta_chart_optionsP8_1 = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };

    this.meta_chart_optionsP8_3 = {
      series: [
        {
          name: 'BAD',
          data: [4]
        },
        {
          name: 'Good',
          data: [1]
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: [this.no_sig_fit_color, this.sig_dn_color, this.sli_dn_color, this.no_change_color, this.sli_up_color, this.sig_up_color],
      plotOptions: {
        bar: {
          horizontal: true,
          // colors: {
          //   backgroundBarColors: ['#FF5733', '#FFC300', '#4CAF50', '#00BCD4', '#9C27B0'], // Specify colors for each classification
          //   backgroundBarOpacity: 1,
          //   backgroundBarRadius: 0,
          // },
        }
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [''],
        tickAmount: 0,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false,
        labels: {
          show: false
        },
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
    };


    this.model_chart_optionsP8_1 = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === '' && gene.natal_status === 'P8' && gene.Comparison === 'ShamvsMI');
            let slected_gene = psd1_genes[opts.dataPointIndex];
            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };

    this.model_chart_optionsP8_3 = {
      series: [{
        name: this.gene_list[0].gene?.toString(),
        data: [],
      }
      ],
      chart: {
        height: '100%',
        type: "scatter",
        events: {
          dataPointSelection: (e, chart, opts) => {
            const psd1_genes = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === '' && gene.natal_status === 'P8' && gene.Comparison === 'ShamvsMI');
            let slected_gene = psd1_genes[opts.dataPointIndex];
            this.to_map = {
              pmid: slected_gene.pmid,
              cell_type: slected_gene.cell_type,
              gene: slected_gene.gene,
              cell_type2: slected_gene.cell_type2,
              cell_type3: slected_gene.cell_type3,
              slope: slected_gene.slope,
              pvalue: slected_gene.p_value,
              intercept: slected_gene.inter,
              lfc: slected_gene.lfc,
              g_id: slected_gene.plotting_id
            };
            this.model_selected = true;
          }
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        tooltip: {
          formatter: function (val, opts) {
            return val.toString()
          }
        },
        //type: "numeric",
        //tickAmount: 10,
        //min: -2,
        //max: 2
      },
      markers: {
        size: 10
      },
      yaxis: {
        title: {
          text: "-Log10(Adjusted P-Value)",
          style: {
            fontSize: '18px'
          }
        }
      },
      fill: {
        type: "pattern",
        pattern: {
          style: "verticalLines",

        }
      },
      title: {
        text: this.gene_list[0].gene!.toString(),
        align: "center",
        style: {
          color: "#0d6efd"
        }
      },
      tooltip: {
        enabled: false
      },
      annotations: {
        yaxis: [
          {
            y: 1.30103,
            strokeDashArray: 10,
            borderColor: 'black',
          }
        ],
        xaxis: [
          {
            x: 0,
            strokeDashArray: 7,
            borderColor: 'grey',
          }
        ]
      }
    };








    this.createDisplayData()
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gene_list'] && !changes['gene_list'].firstChange) {
      // Update charts when gene_list input changes
      this.createDisplayData();
    }
  }


  createDisplayData() {
    console.log("Starting createDisplayData");
    console.log("Genes:", this.gene_list); // Log first few genes
    // Check what PSD values exist in the gene list
    console.log("PSD Values in Gene List:", this.gene_list.map(gene => gene.PSD));


    // Split gene_list into PSD groups P1vsP8
    const group1_Sham = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === 'Sham' && gene.Comparison === 'P1vsP8');
    const group1_MI = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === 'MI' && gene.Comparison === 'P1vsP8');
    const group3_MI = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === 'MI' && gene.Comparison === 'P1vsP8');
    const group3_Sham = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === 'Sham' && gene.Comparison === 'P1vsP8');

    // Sham Vs MI
    const groupP1_1 = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === '' && gene.natal_status === 'P1' && gene.Comparison === 'ShamvsMI');
    const groupP1_3 = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === '' && gene.natal_status === 'P1' && gene.Comparison === 'ShamvsMI');
    const groupP8_1 = this.gene_list.filter(gene => gene.PSD === 1 && gene.Surgery === '' && gene.natal_status === 'P8' && gene.Comparison === 'ShamvsMI');
    const groupP8_3 = this.gene_list.filter(gene => gene.PSD === 3 && gene.Surgery === '' && gene.natal_status === 'P8' && gene.Comparison === 'ShamvsMI');


    // Initialize variables for both groups P1vsP8
    let model_data1_Sham: { x: number; y: number; fillColor: string }[] = [];
    let model_data3_Sham: { x: number; y: number; fillColor: string }[] = [];
    let meta_series_info1_Sham = [0, 0, 0, 0, 0, 0];
    let meta_series_info3_Sham = [0, 0, 0, 0, 0, 0];
    let cluster_number1_Sham = group1_Sham.length;
    let cluster_number3_Sham = group3_Sham.length;

    // Initialize variables for both groups
    let model_data1_MI: { x: number; y: number; fillColor: string }[] = [];
    let model_data3_MI: { x: number; y: number; fillColor: string }[] = [];
    let meta_series_info1_MI = [0, 0, 0, 0, 0, 0];
    let meta_series_info3_MI = [0, 0, 0, 0, 0, 0];
    let cluster_number1_MI = group1_MI.length;
    let cluster_number3_MI = group3_MI.length;

    // Track ranges separately for each group
    let min_lfc1_Sham = Number.POSITIVE_INFINITY;
    let max_lfc1_Sham = Number.NEGATIVE_INFINITY;
    let max_p_val1_Sham = Number.NEGATIVE_INFINITY;

    let min_lfc3_Sham = Number.POSITIVE_INFINITY;
    let max_lfc3_Sham = Number.NEGATIVE_INFINITY;
    let max_p_val3_Sham = Number.NEGATIVE_INFINITY;

    // Track ranges separately for each group
    let min_lfc1_MI = Number.POSITIVE_INFINITY;
    let max_lfc1_MI = Number.NEGATIVE_INFINITY;
    let max_p_val1_MI = Number.NEGATIVE_INFINITY;

    let min_lfc3_MI = Number.POSITIVE_INFINITY;
    let max_lfc3_MI = Number.NEGATIVE_INFINITY;
    let max_p_val3_MI = Number.NEGATIVE_INFINITY;


    // Initialize variables for both groups ShamvsMI
    let model_dataP1_1: { x: number; y: number; fillColor: string }[] = [];
    let model_dataP8_1: { x: number; y: number; fillColor: string }[] = [];
    let meta_series_infoP1_1 = [0, 0, 0, 0, 0, 0];
    let meta_series_infoP8_1 = [0, 0, 0, 0, 0, 0];
    let cluster_numberP1_1 = groupP1_1.length;
    let cluster_numberP8_1 = groupP8_1.length;

    // Initialize variables for both groups
    let model_dataP1_3: { x: number; y: number; fillColor: string }[] = [];
    let model_dataP8_3: { x: number; y: number; fillColor: string }[] = [];
    let meta_series_infoP1_3 = [0, 0, 0, 0, 0, 0];
    let meta_series_infoP8_3 = [0, 0, 0, 0, 0, 0];
    let cluster_numberP1_3 = groupP1_3.length;
    let cluster_numberP8_3 = groupP8_3.length;

    // Track ranges separately for each group
    let min_lfcP1_1 = Number.POSITIVE_INFINITY;
    let max_lfcP1_1 = Number.NEGATIVE_INFINITY;
    let max_p_valP1_1 = Number.NEGATIVE_INFINITY;

    let min_lfcP8_1 = Number.POSITIVE_INFINITY;
    let max_lfcP8_1 = Number.NEGATIVE_INFINITY;
    let max_p_valP8_1 = Number.NEGATIVE_INFINITY;

    // Track ranges separately for each group
    let min_lfcP1_3 = Number.POSITIVE_INFINITY;
    let max_lfcP1_3 = Number.NEGATIVE_INFINITY;
    let max_p_valP1_3 = Number.NEGATIVE_INFINITY;

    let min_lfcP8_3 = Number.POSITIVE_INFINITY;
    let max_lfcP8_3 = Number.NEGATIVE_INFINITY;
    let max_p_valP8_3 = Number.NEGATIVE_INFINITY;

    // Process PSD 1 group
    console.log("Processing Group 1");


    for (let i = 0; i < cluster_number1_Sham; i++) {
      let gene = group1_Sham[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_info1_Sham = this.updateMetaSeriesInfo(meta_series_info1_Sham, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_data1_Sham.push(formatted_data);

      if (lfc < min_lfc1_Sham) min_lfc1_Sham = lfc;
      if (lfc > max_lfc1_Sham) max_lfc1_Sham = lfc;
      if (p_value > max_p_val1_Sham) max_p_val1_Sham = p_value;
    }

    for (let i = 0; i < cluster_number3_Sham; i++) {
      let gene = group3_Sham[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_info3_Sham = this.updateMetaSeriesInfo(meta_series_info3_Sham, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_data3_Sham.push(formatted_data);

      if (lfc < min_lfc3_Sham) min_lfc3_Sham = lfc;
      if (lfc > max_lfc3_Sham) max_lfc3_Sham = lfc;
      if (p_value > max_p_val3_Sham) max_p_val3_Sham = p_value;
    }


    for (let i = 0; i < cluster_number1_MI; i++) {
      let gene = group1_MI[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_info1_MI = this.updateMetaSeriesInfo(meta_series_info1_MI, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_data1_MI.push(formatted_data);

      if (lfc < min_lfc1_MI) min_lfc1_MI = lfc;
      if (lfc > max_lfc1_MI) max_lfc1_MI = lfc;
      if (p_value > max_p_val1_MI) max_p_val1_MI = p_value;
    }

    // Process PSD 3 group
    for (let i = 0; i < cluster_number3_MI; i++) {
      let gene = group3_MI[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_info3_MI = this.updateMetaSeriesInfo(meta_series_info3_MI, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_data3_MI.push(formatted_data);

      if (lfc < min_lfc3_MI) min_lfc3_MI = lfc;
      if (lfc > max_lfc3_MI) max_lfc3_MI = lfc;
      if (p_value > max_p_val3_MI) max_p_val3_MI = p_value;
    }

    for (let i = 0; i < cluster_numberP1_1; i++) {
      let gene = groupP1_1[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_infoP1_1 = this.updateMetaSeriesInfo(meta_series_infoP1_1, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_dataP1_1.push(formatted_data);

      if (lfc < min_lfcP1_1) min_lfcP1_1 = lfc;
      if (lfc > max_lfcP1_1) max_lfcP1_1 = lfc;
      if (p_value > max_p_valP1_1) max_p_valP1_1 = p_value;
    }

    for (let i = 0; i < cluster_numberP8_1; i++) {
      let gene = groupP8_1[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_infoP8_1 = this.updateMetaSeriesInfo(meta_series_infoP8_1, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_dataP8_1.push(formatted_data);

      if (lfc < min_lfcP8_1) min_lfcP8_1 = lfc;
      if (lfc > max_lfcP8_1) max_lfcP8_1 = lfc;
      if (p_value > max_p_valP8_1) max_p_valP8_1 = p_value;
    }


    for (let i = 0; i < cluster_numberP1_3; i++) {
      let gene = groupP1_3[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_infoP1_3 = this.updateMetaSeriesInfo(meta_series_infoP1_3, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_dataP1_3.push(formatted_data);

      if (lfc < min_lfcP1_3) min_lfcP1_3 = lfc;
      if (lfc > max_lfcP1_3) max_lfcP1_3 = lfc;
      if (p_value > max_p_valP1_3) max_p_valP1_3 = p_value;
    }

    // Process PSD 3 group
    for (let i = 0; i < cluster_numberP8_3; i++) {
      let gene = groupP8_3[i];
      let lfc = Number(gene.lfc);
      let p_value = Number(gene.p_value);

      if (isNaN(lfc) || isNaN(p_value)) continue;

      meta_series_infoP8_3 = this.updateMetaSeriesInfo(meta_series_infoP8_3, lfc, p_value);

      let fill_color = this.getFillColor(p_value, lfc);
      let formatted_data = { x: lfc, y: p_value, fillColor: fill_color };
      model_dataP8_3.push(formatted_data);

      if (lfc < min_lfcP8_3) min_lfcP8_3 = lfc;
      if (lfc > max_lfcP8_3) max_lfcP8_3 = lfc;
      if (p_value > max_p_valP8_3) max_p_valP8_3 = p_value;
    }



    // Calculate ranges for both groups
    let temp1_Sham = Math.max(Math.abs(min_lfc1_Sham), max_lfc1_Sham);
    min_lfc1_Sham = -temp1_Sham - 0.1;
    max_lfc1_Sham = temp1_Sham + 0.1;

    let temp3_Sham = Math.max(Math.abs(min_lfc3_Sham), max_lfc3_Sham);
    min_lfc3_Sham = -temp3_Sham - 0.1;
    max_lfc3_Sham = temp3_Sham + 0.1;

    max_p_val1_Sham = Math.ceil(max_p_val1_Sham + 1)
    max_p_val3_Sham = Math.ceil(max_p_val3_Sham + 1)

    // Calculate ranges for both groups
    let temp1_MI = Math.max(Math.abs(min_lfc1_MI), max_lfc1_MI);
    min_lfc1_MI = -temp1_MI - 0.1;
    max_lfc1_MI = temp1_MI + 0.1;

    let temp3_MI = Math.max(Math.abs(min_lfc3_MI), max_lfc3_MI);
    min_lfc3_MI = -temp3_MI - 0.1;
    max_lfc3_MI = temp3_MI + 0.1;

    max_p_val1_MI = Math.ceil(max_p_val1_MI + 1)
    max_p_val3_MI = Math.ceil(max_p_val3_MI + 1)



    // Calculate ranges for both groups
    let tempP1_1 = Math.max(Math.abs(min_lfcP1_1), max_lfcP1_1);
    min_lfcP1_1 = -tempP1_1 - 0.1;
    max_lfcP1_1 = tempP1_1 + 0.1;

    let tempP1_3 = Math.max(Math.abs(min_lfcP1_3), max_lfcP1_3);
    min_lfcP1_3 = -tempP1_3 - 0.1;
    max_lfcP1_3 = tempP1_3 + 0.1;

    max_p_valP1_1 = Math.ceil(max_p_valP1_1 + 1)
    max_p_valP1_3 = Math.ceil(max_p_valP1_3 + 1)

    // Calculate ranges for both groups
    let tempP8_1 = Math.max(Math.abs(min_lfcP8_1), max_lfcP8_1);
    min_lfcP8_1 = -tempP8_1 - 0.1;
    max_lfcP8_1 = tempP8_1 + 0.1;

    let tempP8_3 = Math.max(Math.abs(min_lfcP8_3), max_lfcP8_3);
    min_lfcP8_3 = -tempP8_3 - 0.1;
    max_lfcP8_3 = tempP8_3 + 0.1;

    max_p_valP8_1 = Math.ceil(max_p_valP8_1 + 1)
    max_p_valP8_3 = Math.ceil(max_p_valP8_3 + 1)

    let num_ticks = 5

    //Setup MetaChart
    this.meta_chart_options1_Sham.chart!.width = cluster_number1_Sham > 20 ? '100%' : Math.trunc(cluster_number1_Sham * 5).toString() + '%'
    this.meta_chart_options1_Sham.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_info1_Sham[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_info1_Sham[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_info1_Sham[1]]
      },
      {
        name: "No Change",
        data: [meta_series_info1_Sham[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_info1_Sham[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_info1_Sham[4]]
      },
    ]

    //Setup ModelChart
    this.model_chart_options1_Sham.series = [{ data: model_data1_Sham }]

    // Debug X-Axis settings
    console.log("X-Axis Range for ModelChart:");
    console.log("Min LFC:", min_lfc1_Sham, "Max LFC:", max_lfc1_Sham);

    this.model_chart_options1_Sham.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
        
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfc1_Sham,
      max: max_lfc1_Sham
    }
    this.model_chart_options1_Sham.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_val1_Sham,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }
    //this.model_chart_options.title = {text: this.gene_list[0].gene!.toString(),align: "center"}
    //this.model_chart_options.xaxis = {min: min_lfc, max: max_lfc}
    //Set Heights Model Graph
    let scaler_Sham = cluster_number1_Sham > 15 ? cluster_number1_Sham : 15
    let height_Sham = (scaler_Sham * 15).toString() + 'px'
    //this.model_chart_options.chart!.height = height



    //Setup MetaChart
    this.meta_chart_options1_MI.chart!.width = cluster_number1_MI > 20 ? '100%' : Math.trunc(cluster_number1_MI * 5).toString() + '%'
    this.meta_chart_options1_MI.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_info1_MI[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_info1_MI[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_info1_MI[1]]
      },
      {
        name: "No Change",
        data: [meta_series_info1_MI[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_info1_MI[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_info1_MI[4]]
      },
    ]

    //Setup ModelChart
    this.model_chart_options1_MI.series = [{ data: model_data1_MI }]

    // Debug X-Axis settings
    console.log("X-Axis Range for ModelChart:");
    console.log("Min LFC:", min_lfc1_MI, "Max LFC:", max_lfc1_MI);

    this.model_chart_options1_MI.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfc1_MI,
      max: max_lfc1_MI
    }
    this.model_chart_options1_MI.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_val1_MI,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }
    //this.model_chart_options.title = {text: this.gene_list[0].gene!.toString(),align: "center"}
    //this.model_chart_options.xaxis = {min: min_lfc, max: max_lfc}
    //Set Heights Model Graph
    let scaler = cluster_number1_MI > 15 ? cluster_number1_MI : 15
    let height = (scaler * 15).toString() + 'px'
    //this.model_chart_options.chart!.height = height




    //Setup MetaChart
    this.meta_chart_options3_Sham.chart!.width = cluster_number3_Sham > 20 ? '100%' : Math.trunc(cluster_number3_Sham * 5).toString() + '%'
    this.meta_chart_options3_Sham.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_info3_Sham[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_info3_Sham[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_info3_Sham[1]]
      },
      {
        name: "No Change",
        data: [meta_series_info3_Sham[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_info3_Sham[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_info3_Sham[4]]
      },
    ]
    //Setup ModelChart
    this.model_chart_options3_Sham.series = [{ data: model_data3_Sham }]
    this.model_chart_options3_Sham.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfc3_Sham,
      max: max_lfc3_Sham
    }
    this.model_chart_options3_Sham.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_val3_Sham,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }


    //Setup MetaChart
    this.meta_chart_options3_MI.chart!.width = cluster_number3_MI > 20 ? '100%' : Math.trunc(cluster_number3_MI * 5).toString() + '%'
    this.meta_chart_options3_MI.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_info3_MI[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_info3_MI[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_info3_MI[1]]
      },
      {
        name: "No Change",
        data: [meta_series_info3_MI[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_info3_MI[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_info3_MI[4]]
      },
    ]
    //Setup ModelChart
    this.model_chart_options3_MI.series = [{ data: model_data3_MI }]
    this.model_chart_options3_MI.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfc3_MI,
      max: max_lfc3_MI
    }
    this.model_chart_options3_MI.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_val3_MI,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }

















    //Setup MetaChart
    this.meta_chart_optionsP1_1.chart!.width = cluster_numberP1_1 > 20 ? '100%' : Math.trunc(cluster_numberP1_1 * 5).toString() + '%'
    this.meta_chart_optionsP1_1.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_infoP1_1[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_infoP1_1[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_infoP1_1[1]]
      },
      {
        name: "No Change",
        data: [meta_series_infoP1_1[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_infoP1_1[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_infoP1_1[4]]
      },
    ]

    //Setup ModelChart
    this.model_chart_optionsP1_1.series = [{ data: model_dataP1_1 }]

    // Debug X-Axis settings
    console.log("X-Axis Range for ModelChart:");
    console.log("Min LFC:", min_lfcP1_1, "Max LFC:", max_lfcP1_1);

    this.model_chart_optionsP1_1.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfcP1_1,
      max: max_lfcP1_1
    }
    this.model_chart_optionsP1_1.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_valP1_1,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }
    //this.model_chart_options.title = {text: this.gene_list[0].gene!.toString(),align: "center"}
    //this.model_chart_options.xaxis = {min: min_lfc, max: max_lfc}
    //Set Heights Model Graph


    //test comment
    //let scaler_Sham = cluster_numberP1_1 > 15 ? cluster_numberP1_1 : 15
    //let height_Sham = (scaler_Sham * 15).toString() + 'px'



    //Setup MetaChart
    this.meta_chart_optionsP1_3.chart!.width = cluster_numberP1_3 > 20 ? '100%' : Math.trunc(cluster_numberP1_3 * 5).toString() + '%'
    this.meta_chart_optionsP1_3.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_infoP1_3[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_infoP1_3[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_infoP1_3[1]]
      },
      {
        name: "No Change",
        data: [meta_series_infoP1_3[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_infoP1_3[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_infoP1_3[4]]
      },
    ]

    //Setup ModelChart
    this.model_chart_optionsP1_3.series = [{ data: model_dataP1_3 }]

    // Debug X-Axis settings
    console.log("X-Axis Range for ModelChart:");
    console.log("Min LFC:", min_lfcP1_3, "Max LFC:", max_lfcP1_3);

    this.model_chart_optionsP1_3.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfcP1_3,
      max: max_lfcP1_3
    }
    this.model_chart_optionsP1_3.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_valP1_3,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }
    //this.model_chart_options.title = {text: this.gene_list[0].gene!.toString(),align: "center"}
    //this.model_chart_options.xaxis = {min: min_lfc, max: max_lfc}
    //Set Heights Model Graph



    ///test comment

    //   let scaler = cluster_numberP1_3 > 15 ? cluster_numberP1_3 : 15
    //    let height = (scaler * 15).toString() + 'px'




    //Setup MetaChart
    this.meta_chart_optionsP8_1.chart!.width = cluster_numberP8_1 > 20 ? '100%' : Math.trunc(cluster_numberP8_1 * 5).toString() + '%'
    this.meta_chart_optionsP8_1.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_infoP8_1[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_infoP8_1[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_infoP8_1[1]]
      },
      {
        name: "No Change",
        data: [meta_series_infoP8_1[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_infoP8_1[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_infoP8_1[4]]
      },
    ]
    //Setup ModelChart
    this.model_chart_optionsP8_1.series = [{ data: model_dataP8_1 }]
    this.model_chart_optionsP8_1.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfcP8_1,
      max: max_lfcP8_1
    }
    this.model_chart_optionsP8_1.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_valP8_1,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }


    //Setup MetaChart
    this.meta_chart_optionsP8_3.chart!.width = cluster_numberP8_3 > 20 ? '100%' : Math.trunc(cluster_numberP8_3 * 5).toString() + '%'
    this.meta_chart_optionsP8_3.series = [
      {
        name: "Non-Significant Fit",
        data: [meta_series_infoP8_3[5]]
      },
      {
        name: "Significantly Downregulated",
        data: [meta_series_infoP8_3[0]]
      },
      {
        name: "Slightly Downregulated",
        data: [meta_series_infoP8_3[1]]
      },
      {
        name: "No Change",
        data: [meta_series_infoP8_3[2]]
      },
      {
        name: "Slightly Upregulated",
        data: [meta_series_infoP8_3[3]]
      },
      {
        name: "Significantly Upregulated",
        data: [meta_series_infoP8_3[4]]
      },
    ]
    //Setup ModelChart
    this.model_chart_optionsP8_3.series = [{ data: model_dataP8_3 }]
    this.model_chart_optionsP8_3.xaxis = {
      title: {
        text: "Fixed Effect (Log2 Fold Change)",
        offsetY: 75,
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      tooltip: {
        formatter: function (val, opts) {
          return val.toString()
        }
      },
      type: "numeric",
      tickAmount: num_ticks,
      min: min_lfcP8_3,
      max: max_lfcP8_3
    }
    this.model_chart_optionsP8_3.yaxis = {
      title: {
        text: "-Log10(Adjusted P-Value)",
        style: {
          fontSize: '16px',
          color: "#0d6efd"
        }
      },
      min: 0,
      max: max_p_valP8_3,
      labels: {
        formatter: function (val) {
          // Round the y-axis label to an integer
          return Math.round(val).toString();
        }
      }
    }
  }

  updateMetaSeriesInfo(info: number[], lfc: number, pval: number) {
    let i = -1
    if (pval < 1.30103) {
      i = 5
    }
    else if (lfc <= -this.lfc_sig_cutoff) {
      i = 0
    }
    else if (lfc > -this.lfc_sig_cutoff && lfc < -this.lfc_minor_sig_cutoff) {
      i = 1
    }
    else if (lfc >= -this.lfc_minor_sig_cutoff && lfc <= this.lfc_minor_sig_cutoff) {
      i = 2
    }
    else if (lfc > this.lfc_minor_sig_cutoff && lfc < this.lfc_sig_cutoff) {
      i = 3
    }
    else {
      i = 4
    }
    info[i] = info[i] + 1;
    return (info)
  }

  reorder(list: any, ids: any) {
    let new_list = []
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      new_list.push(list[id])
    }
    return (new_list)
  }
  getNumUniqueStudies() {
    let pmids = []
    for (let i = 0; i < this.gene_list.length; i++) {
      pmids.push(this.gene_list[i].pmid)
    }
    let set = new Set(pmids)
    return (set.size)
  }

  getFillColor(p_val: number, lfc: number) {
    if (p_val < 1.30103) {
      return ('black')
    }
    if (lfc < -this.lfc_sig_cutoff) {
      return (this.sig_dn_color)
    }
    if (lfc < -this.lfc_minor_sig_cutoff) {
      return (this.sli_dn_color)
    }
    if (lfc > this.lfc_sig_cutoff) {
      return (this.sig_up_color)
    }
    if (lfc > this.lfc_minor_sig_cutoff) {
      return (this.sli_up_color)
    }
    return (this.no_change_color)
  }
  // cleanArrays(){
  //   let ordered_ids = sortIds(this.gene.fixed_effect);
  //   let num_values = this.gene.fixed_effect!.length;
  //   for(let i = 0; i < this.gene.fixed_effect!.length; i++){
  //     let value = this.gene.fixed_effect![i];
  //     num_values = value=='NA' ? (num_values-1): num_values;
  //   }
  //   ordered_ids = ordered_ids.slice(0,num_values);
  //   this.gene.fixed_effect = this.reorder(this.gene.fixed_effect, ordered_ids)
  //   this.gene.conf_high = this.reorder(this.gene.conf_high, ordered_ids)
  //   this.gene.conf_low = this.reorder(this.gene.conf_low, ordered_ids)
  //   this.gene.p_val = this.reorder(this.gene.p_val, ordered_ids)
  //   this.indices = this.reorder(this.indices, ordered_ids)
  // }
}