import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, sample } from 'rxjs';
import { Metadata } from '../models/metadata.model';
import { Sample } from '../models/sample.model';
import { Positions } from '../models/positions.model';
import { DiffExp } from '../models/diffExp.model';
import { Indices } from '../models/indices.model';
import { Image } from '../models/image.model';
import JSZip from 'jszip';


//Dev Base URL
//const baseUrl = 'http://localhost:80/api/';

//Prod Base URL
const baseUrl = 'http://160.94.104.178:3305/api/';

//query paths
const metaUrl = baseUrl.concat('metadata'.toString());
const sampleUrl = baseUrl.concat('sample'.toString());
const positionsUrl = baseUrl.concat('positions'.toString());
const diffExpUrl = baseUrl.concat('differentialExpression'.toString());
const indicesUrl = baseUrl.concat('indices'.toString());
const imagesUrl = baseUrl.concat('images'.toString());
const linRegUrl = baseUrl.concat('linearRegression'.toString());
const cleanDataUrl =  baseUrl.concat('cleanData'.toString());
const rawDataUrl =  baseUrl.concat('sample/rawData'.toString());
const linRegDataUrl =  baseUrl.concat('linRegData'.toString());
const staticUrl =  baseUrl.concat('static'.toString());
const tarSizeUrl =  baseUrl.concat('tarSize'.toString());
const goEnrichUrl =  baseUrl.concat('goEnrich'.toString());
const giniURL =  baseUrl.concat('gini'.toString());



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  // getAll(): Observable<User[]> {
  //   return this.http.get<User[]>(baseUrl);
  // }

  // get(id: any): Observable<User> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }

  getAllDisplaySamples(): Observable<Sample[]> {
    return this.http.get<Sample[]>(sampleUrl);
  }

  getDownloadedMetaData(sample_ids: string): Observable<any[]> {
    return this.http.get<any[]>(`${sampleUrl}/${'downloadedMetadata'}/${sample_ids}`);
  }

  getSampleInfoForHomepage(): Observable<any[]> {
    return this.http.get<any[]>(`${sampleUrl}/${'homeinfo'}`);
  }

  getSamplesTest(species: any, tissues: any, cell_types:any, age:any, health:any, pmid:any): Observable<Sample[]> {
    return this.http.get<Sample[]>(`${sampleUrl}/${species}/${tissues}/${cell_types}/${age}/${health}/${pmid}`);
  }

  getMetadata(): Observable<Metadata[]> {
    return this.http.get<Metadata[]>(metaUrl);
  }

  getInRangeGenes(start:number, end:number, chr:number): Observable<Positions[]> {
    return this.http.get<Positions[]>(`${positionsUrl}/${start}/${end}/${chr}`);
  }

  getGeneDiffExp(genes:any[]): Observable<DiffExp[]>{
    return this.http.get<DiffExp[]>(`${diffExpUrl}/${genes}`);
  }

  getIndices(): Observable<Indices[]> {
    return this.http.get<Indices[]>(indicesUrl);
  }

  getImage(pmid:number, run_id:number): Observable<Image[]> {
    return this.http.get<Image[]>(`${imagesUrl}/${pmid}/${run_id}`);
  }

  getLinRegGraph(pmid:number, run_id:number, cluster_id:string, cell_type:string, gene: string): Observable<any> {
    return this.http.get<Image[]>(`${linRegUrl}/${pmid}/${run_id}/${cluster_id}/${cell_type}/${gene}`);
  }

  getLinRegData(g_id: number): Observable<any> {
    return this.http.get<any[]>(`${linRegDataUrl}/${g_id}`);
  }

  getCleanData(table_num:number): Observable<any> {
    return this.http.get<any[]>(`${cleanDataUrl}/${1}/${table_num}`);
  }

  getRawData(sample_num:number): Observable<ArrayBuffer> {
    return this.http.get(`${rawDataUrl}/${sample_num}`,{responseType: 'arraybuffer'});
  }

  curlTest(table_num:number): Observable<any> {
    console.log('here')
    return this.http.get<any[]>(`${cleanDataUrl}/${'curl'}/${'1'}`);
  }

  getTarSize(sample_ids:number[]): Observable<any> {
    return this.http.get<any[]>(`${tarSizeUrl}/${sample_ids}`);
  }

  // Anthony Altered
  getGoTerms(tissues: string[], cell_types: string[], pathway: string, comparisonType: string) {
    let formatted_tissues = tissues.join(',').replace(/ /g, '_');
    let formatted_cell_types = cell_types
        .map(str => str.toLowerCase().charAt(0).toUpperCase() + str.slice(1))
        .join(',')
        .replace(/ /g, '_');
    let formatted_pathway = pathway.replace(/ /g, '_');
    let formatted_comparison = comparisonType.replace(/ /g, '_'); // Format comparison type

    console.log(`${goEnrichUrl}/${formatted_tissues}/${formatted_cell_types}/${formatted_pathway}/${formatted_comparison}`);

    return this.http.get<any[]>(`${goEnrichUrl}/${formatted_tissues}/${formatted_cell_types}/${formatted_pathway}/${formatted_comparison}`);
  }


  getPathways(){
    return this.http.get<any[]>(`${goEnrichUrl}/allpathways`);
  }

  getGiniScores(){
    return this.http.get<any[]>(`${giniURL}`);
  }

  staticDownload(sample_ids: number[]): void {
    const urls = sample_ids.map(id => `http://160.94.104.178:3305/static/Sample_${id}.tar.gz`);
    const fileRequests = urls.map(url => this.http.get(url, { responseType: 'blob' }).toPromise());

    // Create a promise for the metadata request
    console.log(sampleUrl);
    const metadataRequest = this.http.get<any[]>(`${sampleUrl}/downloadedMetadata/${sample_ids}`).toPromise();

    // Combine the file requests and the metadata request into a single promise array
    const allRequests = [...fileRequests, metadataRequest];

    Promise.all(allRequests)
      .then((responses: (Blob | undefined | any[])[]) => {  // Explicit type annotation
        const zip = new JSZip();
        console.log('jhe')
        // Handle the file responses
        responses.slice(0, sample_ids.length).forEach((response, index) => {
          if (response instanceof Blob) {
            const fileName = `Sample_${sample_ids[index]}.tar.gz`;
            zip.file(fileName, response);
          } else {
            console.error(`Failed to download file at index ${index}`);
          }
        });

        // Handle the metadata response (the last response in the array)
        const metadata = responses[sample_ids.length];
        console.log(metadata)
        if (metadata) {
          const metadataFileName = 'metadata.json';
          const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
          zip.file(metadataFileName, metadataBlob);
        } else {
          console.error('Failed to download metadata');
        }

        return zip.generateAsync({ type: 'blob' });
      })
      .then((zipFile) => {
        if (zipFile) {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(zipFile);
          downloadLink.download = 'Samples.zip';
          downloadLink.click();
        } else {
          console.error('Failed to generate zip file');
        }
      })
      .catch(error => {
        console.error('Error downloading files or creating zip:', error);
      });
  }
}
