import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexLegend, ApexDataLabels, ApexPlotOptions, ApexTheme, ApexStroke} from "ng-apexcharts";

export type ChartOptions = {
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  charts_ready = false;
  selected_age_group = 'all ages';
  tissue_list = ['kidney','human bone marrow', 'pancreas', 'placenta', 'lung', 'blood', 'dermis']
  public tissue_chart_options: Partial<ChartOptions>;
  public sex_chart_options: Partial<ChartOptions>;
  sample_info: any[];
  tissue_dict: any = {};
  sex_dict: any = {};
  age_dict: any = {'0-9':0,'10-19':0,'20-29':0,'30-49':0,'50-64':0,'65-99':0,'100+':0,}
  logo_list: any[];
  cell_total: string;
  min_age = -1
  max_age = 1000
  is_https: boolean = false;
  options = [
    {
      title: 'Our Mission',
      text: 'SCALIWAG is designed to provide the gerontology community with a large repository of single cell RNA sequencing(scRNA-seq) data to further a wide range of studies on aging. Donor information, like health and age, are includedfor each of the over 75 samples in SCALIWAG.  Datasets in SCALIWAG can be sorted using a wide range of filters, including age, and can be downloaded in their original, unclean formats or in SCALIWAG\'s standard, cleaned format (for more information see Documentation).  Additionally, SALIWAG offers a genome browser tool that can be used to assertain how age effects gene expression in healthy human tissue.'
    },
    {
      title: 'Citation',
      text: 'TBD'
    }
  ]
  
  constructor(private imageService: ImageService, private databaseService: DatabaseService) {
    this.is_https = window.location.protocol === 'https:'? true : false;
    this.databaseService.getSampleInfoForHomepage().subscribe({
      next: (data) => {
        this.sample_info = data;
        this.makeDictionaries()
        this.tissue_chart_options = this.makeChart(this.tissue_dict)
        this.sex_chart_options = this.makeChart(this.sex_dict)
        this.charts_ready = true
      },
      error: (e) => console.error(e)
    });
    this.logo_list = this.imageService.getLogoImages()
   }

  ngOnInit(): void {
  }

  test(age_group: any){
    if(this.selected_age_group == age_group){
      this.selected_age_group = 'All Ages' 
       this.min_age = -1
       this.max_age = 1000
     }
     else{
      switch (age_group){
        case '0-9':
          this.min_age = -1;
          this.max_age = 10;
          break;
        case '10-19':
          this.min_age = 10;
          this.max_age = 20;
          break;
        case '20-29':
          this.min_age = 20;
          this.max_age = 30;
          break;
        case '30-49':
          this.min_age = 30;
          this.max_age = 50;
          break;
        case '50-64':
          this.min_age = 50;
          this.max_age = 65;
          break;
        case '65-99':
          this.min_age = 65;
          this.max_age = 100;
          break;
        case '100+':
          this.min_age = 100;
          this.max_age = 1000;
          break;
      }
      this.selected_age_group = age_group;
     }
     for(let i = 0; i < this.logo_list.length; i ++){
      this.logo_list[i].url = this.logo_list[i].name == this.selected_age_group ? [this.logo_list[i].url.slice(0,-4),"_selected",this.logo_list[i].url.slice(-4)].join('') : this.logo_list[i].url.replace("_selected", "");
    }
    this.makeDictionaries();
    this.tissue_chart_options.series = Object.values(this.tissue_dict);
    this.tissue_chart_options.labels = Object.keys(this.tissue_dict);
    this.sex_chart_options.series = Object.values(this.sex_dict);
    this.sex_chart_options.labels = Object.keys(this.sex_dict);
  }

  makeDictionaries(){
    let temp_tissue_dict: any = {};
    let temp_sex_dict: any = {};
    let temp_age_dict: any = {'0-9':0,'10-19':0,'20-29':0,'30-49':0,'50-64':0,'65-99':0,'100+':0,}
    let cell_count = 0;
    
    for(let i=0; i<this.sample_info.length; i++){
      let sample = this.sample_info[i];
      if(isNaN(this.getAge(sample.age))){
        console.log(sample)
      }
      let age = this.getAge(sample.age)

      //Get Age information to always be displayed
      let age_group = this.getAgeGroup(age);
      temp_age_dict[age_group] = temp_age_dict[age_group] + 1;
      if(!(age >= this.min_age && age < this.max_age)){
        continue;
      }

      //get tissue info
      let tissue = sample.tissue.includes('blood') ? 'blood' : sample.tissue;
      tissue = tissue.toLowerCase()
      //get tissue info
      let sex = sample.sex

      //set values
      temp_tissue_dict[tissue] = temp_tissue_dict[tissue] ? temp_tissue_dict[tissue] + 1 : 1;
      temp_sex_dict[sex] = temp_sex_dict[sex] ? temp_sex_dict[sex] + 1 : 1;
      cell_count = cell_count + Number(sample.num_cells);
    }
    temp_sex_dict = Object.entries(temp_sex_dict);
    temp_sex_dict = temp_sex_dict.map(([key, value]: [string, any]) => [key.charAt(0).toUpperCase() + key.slice(1), value]);
    temp_sex_dict.sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
    temp_sex_dict = Object.fromEntries(temp_sex_dict);

    temp_tissue_dict = Object.entries(temp_tissue_dict);
    temp_tissue_dict = temp_tissue_dict.map(([key, value]: [string, any]) => [key.charAt(0).toUpperCase() + key.slice(1), value]);
    temp_tissue_dict.sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
    temp_tissue_dict = Object.fromEntries(temp_tissue_dict);

    this.tissue_dict = temp_tissue_dict;
    this.sex_dict = temp_sex_dict;
    this.age_dict = temp_age_dict;
    this.cell_total = cell_count.toLocaleString();
  }
  makeChart(input_dict: any){
    let chart: Partial<ChartOptions> = {
      series: Object.values(input_dict),
      chart: {
        type: "donut",
        height: '550',
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
                color: ' #E85A4F'
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
          shadeIntensity: 0.75
        }
      },
      stroke:{
        width:2,
        colors: ['#E0DCCC']
      }
    };
    return(chart)
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
  prettify(input_name:string){
    input_name = input_name.replace("_", " ")
    const words = input_name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return(words.join(" "));
  }
}