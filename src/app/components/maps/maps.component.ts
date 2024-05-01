import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Image } from 'src/app/models/image.model';
import { DomSanitizer } from '@angular/platform-browser';
import {ApexAxisChartSeries,ApexChart,ApexPlotOptions,ApexXAxis, ApexTitleSubtitle, ApexTooltip, ApexYAxis, ApexMarkers, ApexFill, ApexAnnotations} from "ng-apexcharts";
var ncbi = require('node-ncbi');

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
};

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() selected_info!: {pmid:number, cell_type:string, gene: string, cell_type2: string, cell_type3: string, slope: number, intercept: number, g_id: number};
  @Input() en_id!: string | undefined;
  image: Image[];
  tsne: any;
  umap: any;
  lin_reg_data: any;
  title: string;
  author: string;
  year: string;
  ages: number[];
  exp: number[];
  points_data: any[];
  line_data: any[];

  public linReg_chart_options: Partial<ChartOptions>;


  maps = [{text: "umap"}, {text: "tsne"}, {text: "Linear Regression"}, {text: "Meta Info"}];
  display = 'umap';

  constructor(private databaseService: DatabaseService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getClusterImages()
    this.getLinRegGraphData()
    }

  getClusterImages(){
    this.databaseService.getImage(this.selected_info.pmid, 1).subscribe({
      next: (data) => {
        this.image = data;
        this.tsne = this.decodeImage(this.image[0].TSNE!)
        this.umap = this.decodeImage(this.image[0].UMAP!)
     },
      error: (e) => console.error(e)
    });
  }

  getLinRegGraphData(){
    this.databaseService.getLinRegData(
      this.selected_info.g_id
      ).subscribe({
      next: (data) => {
        this.ages = data[0].age.split(',')
        this.exp = data[0].exp.split(',')
        this.prepGraphData()
        this.makeLinRegGraph()
     },
      error: (e) => console.error(e)
    });
  }

  prepGraphData(){
    //Prepare Point Data
    let points = []
    for(let i=0; i<this.ages.length; i++){
      let point = [Number(this.ages[i]), Number(this.exp[i]).toFixed(3)]
      points.push(point)
    }
    let line_data = []
    for(let i=1; i<100; i++){
      let y = (Number(this.selected_info.slope) * i + Number(this.selected_info.intercept)).toFixed(3)
      let point = [i, y]
      line_data.push(point)
    }

    this.points_data = points
    this.line_data = line_data
  }

  makeLinRegGraph(){
    this.linReg_chart_options = {
      series: [{
        name: 'Cells',
        type: 'scatter',
        data: this.points_data
      },{
        name: 'Linear Regression',
        type: 'line',
        data: this.line_data
      }],
      chart: {
        height: 417,
        type: 'line'
      },
      fill: {
        type:'solid',
      },
      markers: {
        size: [6, 0]
      },
      tooltip: {
        shared: false,
        intersect: true,
      },
      xaxis:{
        tickAmount: 10
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return (value.toFixed(1)).toString(); // Round the tick value to the nearest whole number
          }
        }
      }
    }
  }

  arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
  }

  decodeImage(buffer: any){
    let data = buffer.data
    let base64 = this.arrayBufferToBase64(data)
    return(this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64}`))
  }
  onItemSelected($event: any){
    this.display = $event.itemData.text
  }

  ngOnChanges(changes: SimpleChanges){
    this.selected_info = changes['selected_info'].currentValue;
    this.formatOtherCellTypes()
    const pubmed = ncbi.pubmed;
    pubmed.summary(this.selected_info.pmid).then((results:any) => {
      this.title = results.title
      this.author = results.authors.split(',')[0].replace(' ',', ')
      this.year = results.pubDate.split('/')[0]
    });
    this.getClusterImages()
    this.getLinRegGraphData() 
    this.prepGraphData()
    this.makeLinRegGraph()
  }

  formatOtherCellTypes(){
    this.selected_info.cell_type2 = this.selected_info.cell_type2 == 'NA' ? '' : (this.selected_info.cell_type2);
    this.selected_info.cell_type3 = this.selected_info.cell_type3 == 'NA' ? '' : (', '+ this.selected_info.cell_type3);
    if(this.selected_info.cell_type2 == '' && this.selected_info.cell_type3 == ''){
      this.selected_info.cell_type2 = 'None'
    }
  }

}