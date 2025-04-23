import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConstsService {
  tissueTypes: string[] = [   
      "Heart",
      "Bone Marrow"
  ]
  cellTypes: string[] = [
    "Adipose progenitor cell" ,"Adipose-derived stem cell" ,"Adipose-derived stromal cell" ,"Adipose multilineage-differentiating stress-enduring cell" ,"Beige adipogenic precursor cell" ,
    "Type I pneumocyte" ,"Urine-derived stem cell" ,"Vaginal cell" ,"Atypical memory B cell", "Well-established epicardial progenitor cell", "Mural cell", "Endothelial cell", "Endothelial cell 2", "Sinoatrial node (SAN) cell", 
    "Macrophage", "Cardiomyocyte", "M2 macrophage", "Cardiomyocyte 2","Cardiomyocyte 3", "Endothelial cell", "Fibroblast","Fibroblast 2", "Fibroblast 3", "Progenitor cell","Atrial cell", "Airway secretory cell","Alpha cell","Alveolar epithelial progenitor cell","Astrocyte","B cell","Basal cell","Beta cell"
  ]

  DiffExpCellTypes = [
    "Well-established epicardial progenitor cell", "Mural cell", "Endothelial cell", "Endothelial cell 2", "Sinoatrial node (SAN) cell", "Macrophage", "Cardiomyocyte", "M2 macrophage", "Cardiomyocyte 2","Cardiomyocyte 3", "Endothelial cell", "Fibroblast","Fibroblast 2", "Fibroblast 3", "Progenitor cell"   ]

  species: string[] =[
    "Human", "Mouse"
  ]

  DiffExpPMIDTissueDict: { [key: string]: number[] } = {
    "Bone Marrow": [30518681],
    "Brain": [31316211, 31178122],
    "Colon": [32888429, 34428183],
    "Kidney": [31896769],
    "Liver": [30348985, 35021063],
    "Lung": [30554520, 36108172],
    "Pancreas": [30865899, 34450029],
    "Heart": [130699, 34489413]
  };


  getTissueTypes(){
    return this.tissueTypes
  }
  getCellTypes(){
    return this.cellTypes
  }
  getSpecies(){
    return this.species
  }
  getDePmidTissueDict(){
    return this.DiffExpPMIDTissueDict
  }
  getDECellTypes(){
    return this.DiffExpCellTypes
  }
  constructor() { }
}
