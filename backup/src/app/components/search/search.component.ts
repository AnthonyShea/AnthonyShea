import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DatabaseService } from 'src/app/services/database.service';
import { DatabaseConstsService } from '../../services/database-consts.service'
import themes from 'devextreme/ui/themes';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexLegend, ApexDataLabels, ApexPlotOptions, ApexTheme, ApexStroke, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexGrid} from "ng-apexcharts";
import { Console } from 'console';
import * as JSZip from 'jszip';
import { type } from 'os';

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  data_labels: ApexDataLabels;
  options: ApexPlotOptions;
  theme: ApexTheme;
  stroke: ApexStroke;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  data_labels: ApexDataLabels;
  options: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  colors: string[];
};


interface DownloadData {
  blob: Blob;
  filename: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public tissue_chart_options: Partial<DonutChartOptions>;
  public sex_chart_options: Partial<DonutChartOptions>;
  public age_chart_options: Partial<BarChartOptions>;
  public health_chart_options: Partial<DonutChartOptions>;

  tissue_dict: any = {};
  sex_dict: any = {};
  age_dict: any = {'0-9':0,'10-19':0,'20-29':0,'30-49':0,'50-64':0,'65-99':0,'100+':0,}
  health_dict: any = {'Healthy':0, 'Cancer':0, 'Other':0, 'Unkown': 0}
  cell_total: number;
  min_age = -1
  max_age = 1000 

  tissue_types: string[] = [];
  cell_types: string[] = [];
  species: string[] = [];
  health: string[] = [];
  pmid: string = '';

  selected_tissues: string[] = [];
  selected_cells: string[] = [];
  selected_species: string[] = [];
  selected_age: number[] = [];
  selected_health: string[] = []

  tooltip: any;
  checkBoxesMode: string;
  /*display might need to be display? */
  display: any[];
  selectedRowData: any[] = [];
  selectedRowKeys: any[] = [];
  downloadSize: string;
  query_completed = false;

  maps = [{text: "Tissue"}, {text: "Sex"}, {text: "Age"}, {text: "Health"}];
  displayed_map = 'Tissue';

  download_options: { name: string; }[] = []
  selected_download_method: string;

  constructor(private databaseConstService: DatabaseConstsService, private databaseService: DatabaseService) {
    this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
    this.tissue_types = databaseConstService.getTissueTypes();
    //this.species = databaseConstService.getSpecies();
    //this.cell_types = databaseConstService.getCellTypes();
    this.health = ['All','Cancer', 'Healthy']
    this.cell_types = ['All Cells', 'B Cells', 'Dendritic Cells', 'Endothelial Cells', 'Fibroblasts', 'Macrophages', 'Neurons', 'T Cells']

    this.selected_tissues = this.tissue_types;
    this.selected_cells = ['All Cells'];
    this.selected_species = ["Human"];
    this.selected_age = [0,110]
    this.selected_health=['All']
    this.tooltip = {
      enabled: true,
      showMode: 'always',
      position: 'bottom',
    };

    this.download_options = [{name:'Download Standardized Data'},{name:'Download Unformatted Data'}]
    this.selected_download_method = this.download_options[0].name

  }

  ngOnInit(): void {
  }

  cleanDisplay(){
    console.log(typeof(this.display))
    console.log(this.display[1])
    this.display.forEach(obj => {
      if(obj.disease_status.length > 0) {
        if(obj.disease_status.toLowerCase() == 'null'){
          obj.disease_status = 'Healthy'
        }
        obj.disease_status = obj.disease_status.charAt(0).toUpperCase() + obj.disease_status.slice(1);
      }
      obj.tissue = obj.tissue.charAt(0).toUpperCase() + obj.tissue.slice(1);
  });
  }

  samplesTest() {
    let backend_tissue_select = [];
    let backend_health_select = [];

    if(this.selected_species.length == 0){
      this.selected_species = this.species
    }
    if(this.selected_tissues.length == 0){
      this.selected_tissues = this.tissue_types
    }
    backend_tissue_select = this.addBackendTissue(this.selected_tissues)

    if(this.selected_cells.length == 0){
      this.selected_cells = this.cell_types
    }
    if(this.selected_health.length == 0){
      this.selected_health = ["Healthy"];
    }
    backend_health_select = this.addBackendHealth(this.selected_health)

    let pmid_selected = this.pmid == ''? 'undefined':this.pmid

    this.databaseService.getSamplesTest(this.selected_species,backend_tissue_select, this.formatForDB(this.selected_cells),this.selected_age, backend_health_select, pmid_selected)
      .subscribe({
        next: (data) => {
          this.display = data;
          this,this.cleanDisplay()
          this.makeDictionaries()
          this.tissue_chart_options = this.makeDonutChart(this.tissue_dict)
          this.sex_chart_options = this.makeDonutChart(this.sex_dict)
          this.age_chart_options = this.makeBarChart(this.age_dict)
          this.health_chart_options = this.makeDonutChart(this.health_dict)  
          this.query_completed = true
        },
        error: (e) => console.error(e)
      });
  }

  onTissuesChanged($event: any){
    this.selected_tissues = $event.value
  }
  onCellsChanged($event: any){
    this.selected_cells = $event.value
  }  
  onSpeciesChanged($event: any){
    this.selected_species = $event.value
  }
  onAgeChanged($event: any){
    this.selected_age = $event.value
  }
  onHealthChanged($event: any){
    this.selected_health = $event.value
  }
  switchSelectedDownloadMethod($event: any){
    this.selected_download_method=$event.itemData.name
  }

  addBackendTissue(tissue_list: any[]){
    let backend_tissue_select = [...tissue_list]
    if(backend_tissue_select.includes('Intestine')){
      backend_tissue_select.push('SmallInt')
      backend_tissue_select.push('Large')
    }
    if(backend_tissue_select.includes('Rectum')){
      backend_tissue_select.push('REC')
    }

    if(backend_tissue_select.includes('Appendix')){
      backend_tissue_select.push('APD')
    }

    if(backend_tissue_select.includes('Dermis')){
      backend_tissue_select.push('skin')
    }

    if(backend_tissue_select.includes('Blood')){
      backend_tissue_select.push('PBMC')
    }

    if(backend_tissue_select.includes('Bone Marrow')){
      backend_tissue_select.push('marrow')
    }

    if(backend_tissue_select.includes('Common Bile Duct')){
      backend_tissue_select.push('Common bule duct')
    }
    return(backend_tissue_select)
  }


  addBackendHealth(health_list: any[]){
    let backend_health_select = [...health_list]
    if(backend_health_select.includes('Healthy')){
      backend_health_select.push('normal')
    }
    if(backend_health_select.includes('Cancer')){
      backend_health_select.push('carcinoma')
    }

    return(backend_health_select)
  }

  onSelectionChanged(event: any) {
    this.selectedRowKeys = event.selectedRowKeys;
    this.selectedRowData = event.selectedRowsData;
    let selected_ids = this.selectedRowData.map(row => row.sample_id)
    this.databaseService.getTarSize(selected_ids).subscribe({
      next: (data) => {
        this.downloadSize = (data.sum/(1024**3)).toFixed(2) + ' GB'
      },
      error: (e) => {
        console.error(e);
      }
    });
  }  

  containsAnyValue(string: string, values: string[]): boolean {
    return values.some(value => string.includes(value));
  }
  
  downloadWrapper() {
    alert('Download Started')
    let selected_ids = this.selectedRowData.map(row => row.sample_id)
    if(this.selected_download_method == 'Download Standardized Data' && selected_ids.length > 0){
      this.downloadStandaradizedData(selected_ids)
    }
  }

  downloadStandaradizedData(sample_ids: number[]) {
    this.databaseService.staticDownload(sample_ids)
  }
  
dowloadRawData(id: number): Promise<DownloadData> {
  return new Promise((resolve, reject) => {
    this.databaseService.getRawData(id)
      .subscribe({
        next: (data) => {
          const csvData = data;
          const filename = 'Data_' + id + '.csv';
          const blob = new Blob([csvData], { type: 'text/csv' });
          resolve({ blob, filename });
        },
        error: (e) => {
          console.error(e);
          reject(e);
        }
      });
  });
}


  /* NEW STUFF, QUESTIONABLE */

  onItemSelected($event: any){
    this.displayed_map = $event.itemData.text
  }

  makeDictionaries(){
    let temp_tissue_dict: any = {};
    let temp_sex_dict: any = {};
    let temp_age_dict: any = {'0-9':0,'10-19':0,'20-29':0,'30-49':0,'50-64':0,'65-99':0,'100+':0,}
    let temp_health_dict: any = {'Healthy':0, 'Cancer':0, 'Other':0, 'Unkown': 0}
    let cell_count = 0;
    
    for(let i=0; i<this.display.length; i++){
      let sample = this.display[i];
      let age = this.getAge(sample.age)
      

      //Get Age information to always be displayed
      let age_group = this.getAgeGroup(age);
      temp_age_dict[age_group] = temp_age_dict[age_group] + 1;

      if(age < this.min_age || age > this.max_age){
        continue;
      }

      //get tissue info
      let tissue = sample.tissue.includes('blood') ? 'blood' : sample.tissue;
      tissue = tissue.toLowerCase()

      //tissue = this.selected_tissues.includes(tissue) ? tissue : 'other';
      //get sex info
      let sex = sample.sex
      //get health info
      let disease = sample.disease_status
      if(disease == null){
        disease = 'Unkown'
      }
      else{
        if (this.containsAnyValue(disease, ['healthy', 'normal', 'NA', 'Normal'])){
          disease = 'Healthy'
        }
        else if (this.containsAnyValue(disease, ['cancer', 'carcinoma', 'Cancer', 'melanoma'])){
          disease = 'Cancer'
        }
        else{
          disease = 'Other'
        }
      }
      //set dict values
      temp_tissue_dict[tissue] = temp_tissue_dict[tissue] ? temp_tissue_dict[tissue] + 1 : 1;
      temp_sex_dict[sex] = temp_sex_dict[sex] ? temp_sex_dict[sex] + 1 : 1;
      cell_count = cell_count + Number(sample.num_cells);
      temp_health_dict[disease] = temp_health_dict[disease] ? temp_health_dict[disease] + 1 : 1;
    }

    temp_tissue_dict = Object.entries(temp_tissue_dict);
    temp_tissue_dict = temp_tissue_dict.map(([key, value]: [string, any]) => [key.charAt(0).toUpperCase() + key.slice(1), value]);
    temp_tissue_dict.sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
    temp_tissue_dict = Object.fromEntries(temp_tissue_dict);

    this.tissue_dict = temp_tissue_dict;
    this.sex_dict = temp_sex_dict;
    this.age_dict = temp_age_dict;
    this.health_dict = temp_health_dict;
    this.cell_total = cell_count;
  }
  makeDonutChart(input_dict: any){
    console.log(input_dict)
    let chart: Partial<DonutChartOptions> = {
      series: Object.values(input_dict),
      chart: {
        type: "donut",
        height: '425',
      },
      legend: {
        show:false
      },
      labels: Object.keys(input_dict),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      data_labels: {
        formatter: function (val, opts) {
            return opts.w.config.labels[opts.seriesIndex]
        },
        style:{
          fontSize: '16px'
        }
      },
      options:{
        pie:{
          donut:{
            labels:{
              show:true,
              total:{
                show:true,
                label:"Total Samples",
                fontSize: '30px',
                fontWeight: 700,
                color: '#E85A4F'
              },
              value:{
                fontFamily: 'RobotoCondensed-Bold',
                fontSize: '50px',
                color: '#8E8D8A',
                fontWeight: 600,
                offsetY: 25
              }
            }
          }
        }
      },
      theme:{
        monochrome:{
          enabled:true,
          color: '#E85A4F',
          shadeTo:'dark',
          shadeIntensity: 0.55
        }
      },
      stroke:{
        width:2,
        colors: ['#E0DCCC']
      }
    };
    return(chart)
  }

  makeBarChart(input_dict: any){
    let age_names = Object.keys(input_dict)
    let age_count = Object.values(input_dict)
    let chart: Partial<BarChartOptions> = {
      series: [
        {
          name: "Age",
          data: [
            {
              x: age_names[0],
              y: age_count[0],
            },
            {
              x: age_names[1],
              y: age_count[1],
            },
            {
              x: age_names[2],
              y: age_count[2],
            },
            {
              x: age_names[3],
              y: age_count[3],
            },
            {
              x: age_names[4],
              y: age_count[4],
            },
            {
              x: age_names[5],
              y: age_count[5],
            },
            {
              x: age_names[6],
              y: age_count[6],
            }
          ]
        }
      ],
      chart: {
        height: 400,
        type: "bar",
        foreColor:"#E85A4F"
      },
      options: {
        bar: {
          columnWidth: "80%"
        }
      },
      data_labels: {
        enabled: true,
        style: {
          fontSize: '35px',
          fontFamily: 'RobotoCondensed-Bold',
          fontWeight: 600,
          colors:[
            function ({ w, dataPointIndex }:any) {
              if (w.config.series[0].data[dataPointIndex].y > 0) {
                return "white";
              } else {
                return "#8E8D8A";
              }
            },
          ]
      },
      },
      legend: {
        show: false,
      },
      xaxis:{
        labels:{
          style:{
            fontSize: '15px',
            fontWeight: 700
            
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      yaxis:{
        show:false,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
      },
      grid:{
        yaxis:{
          lines:{
            show:false
          }
        }
      },
      colors:['#E85A4F']
    };
    return(chart)
  }

  getAgeGroup(age:number){
    if(age < 10){
      return('0-9')
    }
    else if(age < 20){
      return('10-19')
    }
    else if(age < 30){
      return('20-29')
    }
    else if(age < 50){
      return('30-49')
    }
    else if(age < 65){
      return('50-64')
    }
    else if(age < 100){
      return('65-99')
    }
    return('100+')
  }

  formatRow($event: any){
    if($event.rowType == 'header'){
      $event.rowElement.style.backgroundColor = "#EAE7DC";
      $event.rowElement.style.color = "black";
      $event.rowElement.style.fontWeight = 700;


    }
    else if($event.key % 2 == 0){
      $event.rowElement.style.backgroundColor = "#EAE7DC";
    }
    else{
      $event.rowElement.style.backgroundColor = "#E0DCCC";
    }
  }

  getDownloadedMetaData(formatted_sample_ids: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.databaseService.getDownloadedMetaData(formatted_sample_ids)
        .subscribe({
          next: (data) => {
            const csv = this.convertToCSV(data);
            resolve(csv);
          },
          error: (e) => {
            console.error(e);
            reject(e);
          }
        });
    });
  }
  
  convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(obj => {
      return Object.values(obj).map(value => {
        // If the value contains a comma or double quote, enclose it in double quotes and escape any existing double quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
      }).join(',');
    });
    return header + rows.join('\n');
  }

  formatForDB(selection: string[]){
    let mod_selection = selection.map(value => value.toLowerCase().replace(/\s+/g, '_'));
    return(mod_selection)
  }

  getAge(age:any){
    let ret_age = -10
    if(age.toLowerCase().includes('w') || age.toLowerCase().includes('f')){
      ret_age = 0
    }
    else if(age.includes('-')){
      let ages = age.split('-')
      ret_age  = (Number(ages[0]) + Number(ages[1]))/2
    }
    else if(age.includes('+')){
      ret_age  = Number(age.replace("+",""))
    }
    else {
      ret_age = Number(age)
    }
    return(ret_age)
  }
}