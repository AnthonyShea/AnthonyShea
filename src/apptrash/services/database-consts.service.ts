import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConstsService {
  tissueTypes: string[] = [   
      "Abdomen", "Heart", "Adipose", "Adrenal Gland", "Airway", "Appendix", "Artery", "Bladder", "Blood", "Blood Vessel", "Bone Marrow", "Brain", "Breast", "Bronchi", "Calavaria", "Cerebellum", "Cervix", "Chest", "Colon", "Common Bile Duct", "Dermis", "Duodenum", "Epityphlon", "Esophagus", "Eye", "Fallopian Tube", "Female Gonad", "Heart", "Ileum", "Immune System", "Infratemporal Fossa", "Intestine", "Intervertebral Disks", "Jejunum", "Kidney", "Liver", "Lung", "Lymph", "Male Gonad", "Metastatic Tumor", "Mouth", "Muscle", "Olfactory Cleft", "Omentum", "Ovary", "Palatine Tonsil", "Pancreas", "Parapharyngeal Space", "Placenta", "Pleura", "Prostate", "Quadriceps Femoris", "Rectum", "Rib", "Spleen", "Spinal Cord", "Stomach", "Temporal Lobe", "Testis", "Thymus", "Thyroid", "Tibialis", "Trachea", "Ureter", "Urethra", "Uterus", "Vaginal Wall"
  ]
  cellTypes: string[] = [
    "Adipose progenitor cell" ,"Adipose-derived stem cell" ,"Adipose-derived stromal cell" ,"Adipose multilineage-differentiating stress-enduring cell" ,"Beige adipogenic precursor cell" ,
    "Brown adipogenic precursor cell" ,"Dedifferentiation adipocyte" ,"Endoderm progenitor cell" ,"Endothelial cell" ,"Endothelial progenitor cell" ,"Fat cell (adipocyte)" ,"Macrophage" ,
    "Mesenchymal progenitor cell" ,"Mesenchymal stem cell" ,"Mesenchymal stromal cell" ,"Multipotent mesenchymal stroma cell" ,"Natural killer cell" ,"Neuron" ,"Pericyte" ,"Preadipocyte" ,
    "Preadipocyte progenitor cell" ,"Smooth muscle cell" ,"Stem cell" ,"Stromal cell" ,"Stromal vascular fraction cell" ,"Chromaffin cell" ,"Definitive zone cell" ,"Multipotent stem cell" ,
    "Basal cell" ,"Epithelial cell" ,"Amniotic fluid stem cell" ,"Amnion epithelial cell" ,"T cell" ,"Regulatory T (Treg) cell" ,"Cancer stem cell" ,"Interstitial cell" ,"Urothelium cell" ,
    "Activated CD4+ T cell" ,"Angiogenic T cell" ,"AXL+SIGLEC6+ dendritic cell" ,"B cell" ,"Basophil" ,"Cancer cell" ,"CD14+ endothelial progenitor cell" ,"CD14++CD16- monocyte" ,
    "CD14+CD16+ monocyte" ,"CD141+CLEC9A+ dendritic cell" ,"CD1C-CD141- dendritic cell" ,"CD1C+_A dendritic cell" ,"CD1C+_B dendritic cell" ,"CD4+ T cell" ,"CD8+ T cell" ,
    "Circulating fetal cell" ,"Circulating progenitor cell" ,"Classical monocyte" ,"Cytokine induced killer cell" ,"Cytotoxic T cell" ,"Decidual cell" ,"Dendritic cell" ,"Early hematopoietic cell" ,
    "Effector CD4+ memory T (Tem) cell" ,"Eosinophil" ,"Erythroblast" ,"FOXP3+ natural regulatory T (Treg) cell" ,"Granulocyte" ,"Hematopoietic stem cell" ,"Immature transitional B cell" ,
    "Intermediate monocyte" ,"Leukocyte" ,"Lymphocyte" ,"Lymphoid cell" ,"Mature endothelial cell" ,"Megakaryocyte" ,"Memory B cell" ,"Monocyte" ,"Myeloid cell" ,"Myeloid dendritic cell" ,
    "Myeloid-derived suppressor cell" ,"Naive B cell" ,"Naive CD4+ T cell" ,"Naive T cell" ,"Natural regulatory T (Treg) cell" ,"Neutrophil" ,"Non-classical monocyte" ,"Non-switched B cell" ,
    "Null cell" ,"Plasmablast" ,"Plasmacytoid dendritic cell" ,"Platelet" ,"Progenitor-like angiogenesis-promoting cell" ,"Red blood cell (erythrocyte)" ,"Responder T cell" ,"Switched memory B cell" ,
    "T helper cell" ,"Thymic emigrant cell" ,"Transitional B cell" ,"Vascular progenitor cell" ,"Vascular stem cell" ,"White blood cell" ,"Endothelial stem cell" ,"Multipotent postnatal progenitor cell" ,
    "Multipotent postnatal stem cell" ,"Osteoblast" ,"Osteoclast" ,"Osteocyte" ,"Progenitor cell" ,"Blast cell" ,"Bone marrow stem cell" ,"Bone marrow stromal cell" ,"Dendritic cell progenitor" ,
    "Erythroid precursor" ,"Hematopoietic cell" ,"Hematopoietic progenitor cell" ,"Langerhans cell" ,"Lymphoid-primed multipotent progenitor" ,"M2 macrophage" ,"Mast cell" ,"Mast cell progenitor" ,
    "Mesenchymal cell" ,"Monocyte derived dendritic cell" ,"Myeloid conventional dendritic cell" ,"Neural stem cell" ,"Plasma cell" ,"T1 (Transitional) B cell" ,"T2 (Transitional) B cell" ,
    "Astrocyte" ,"Cancer stem-like cell" ,"Glial cell" ,"Glutamatergic neuron" ,"M1 macrophage" ,"Microglial cell" ,"Neural progenitor cell" ,"Oligodendrocyte" ,"Oligodendrocyte precursor cell" ,
    "Oligodendrocyte progenitor cell" ,"Purkinje cell" ,"T helper1 (Th1) cell" ,"T helper17 (Th17) cell" ,"T helper2 (Th2) cell" ,"Basal epithelial cell" ,"Basal progenitor cell" ,
    "Epithelial progenitor cell" ,"Immune cell" ,"Luminal epithelial cell" ,"Luminal progenitor" ,"Luminal progenitor cell" ,"Myoepithelial cell" ,"Cartilage progenitor cell" ,"Chondrocyte" ,
    "Villous stromal cell" ,"Colonic stem cell" ,"Endocrine cell" ,"Intestinal stem cell" ,"Tumor endothelial cell" ,"Colorectal stem cell" ,"Corneal endothelial cell" ,"Fibroblast" ,
    "Epithelial stem cell" ,"Limbal stem cell" ,"Trophoblast cell" ,"Dental pulp stem cell" ,"Dental pulp cell" ,"Osteogenic precursor-like cell" ,"1-cell stage cell (Blastomere)" ,
    "4-cell stage cell (Blastomere)" ,"8-cell stage cell (Blastomere)" ,"Astroglial progenitor cell" ,"Embryonic stem cell" ,"Epiblast cell" ,"Germ cell" ,"Morula cell (Blastomere)" ,
    "Oocyte" ,"Pancreatic progenitor cell" ,"Pluripotent stem cell" ,"Primitive endoderm cell" ,"Spermatogonial stem cell" ,"Trophectoderm cell" ,"Unrestricted somatic stem cell" ,"Hepatocyte" ,
    "Muscle cell" ,"Neural cell" ,"Interneuron" ,"Alveolar epithelial progenitor cell" ,"Cardiac progenitor cell" ,"Cardiomyocyte" ,"Corneal epithelial progenitor cell" ,"Pancreatic endoderm cell" ,
    "PDX1+ pancreatic progenitor cell" ,"Primordial germ cell" ,"Retinal ganglion cell" ,"Vascular smooth muscle cell" ,"Cytotrophoblast" ,"Endometrial progenitor cell" ,"Endometrial stem cell" ,
    "Somatic stem cell" ,"Endometrial stromal stem cell" ,"Keratinocyte" ,"Ciliated epithelial cell" ,"Esophageal mucosal cell" ,"FGFR1HighNME5- epithelial cell" ,"FGFR1LowNME5- epithelial cell" ,
    "Secretory progenitor cell" ,"Amacrine cell" ,"Bipolar cell" ,"Corneal epithelial stem cell" ,"Pigment epithelial cell" ,"Central nervous system stem cell" ,"Gonadal endothelial cell" ,
    "Gonadal mitotic phase fetal germ cell" ,"Granulosa cell" ,"Leydig cell" ,"Leydig precursor cell" ,"Meiotic prophase fetal germ cell" ,"Migration phase fetal germ cell" ,
    "Mitotic arrest phase fetal germ cell" ,"Mitotic fetal germ cell" ,"Oogenesis phase fetal germ cell" ,"Retinoid acid signaling-responsive fetal germ cell" ,"Sertoli cell" ,
    "Natural killer T (NKT) cell" ,"Primitive vesicle cell" ,"Ureteric bud cell" ,"Endothelial precursor cell" ,"Hematopoietic precursor cell" ,"Kupffer cell" ,"Liver progenitor cell" ,
    "Liver stem cell" ,"Lymphoblast" ,"Neuroendocrine cell" ,"Epidermal stem cell" ,"Epidermal transit amplifying cell" ,"Gastric stem cell" ,"Zymogenic chief cell" ,"Common lymphoid progenitor" ,
    "Definitive endoderm cell" ,"Ectoderm cell" ,"Granulocyte-monocyte progenitor" ,"Hemangioblast" ,"Megakaryocyte-erythroid progenitor" ,"Mesoderm cell" ,"Mesodermal embryonic stem cell" ,
    "Myeloblast" ,"Neural crest cell" ,"Neural tube cell" ,"Proerythroblast" ,"Gonocyte" ,"Premeiotic germ cell" ,"Dermal papilla cell" ,"Epithelial hair follicle stem cell" ,"Hair follicle cell" ,
    "Merkel cell" ,"Neural crest stem cell" ,"Cardiovascular progenitor cell" ,"Multipotent progenitor cell" ,"Semilunar valve cell" ,"Nucleus pulposus cell" ,"Schwann cell" ,
    "Intestinal epithelial stem cell" ,"Paneth cell" ,"EBV+ B lymphoma cell" ,"Infiltrated mononuclear cell" ,"Mesangial cell" ,"Nephron epithelial cell" ,"Proximal tubular cell" ,
    "DCLK1+ progenitor cell" ,"Enterocyte" ,"Enteroendocrine cell" ,"Goblet cell" ,"Goblet progenitor cell" ,"LGR5+ stem cell" ,"MKI67+ progenitor cell" ,"PROM1High progenitor cell" ,
    "PROM1Low progenitor cell" ,"Corneal limbal stem cell" ,"Limbal epithelial stem cell" ,"Bile duct cell" ,"CD4+ cytotoxic T cell" ,"Exhausted CD4+ T cell" ,"Exhausted CD8+ T cell" ,
    "Hepatoblast" ,"Ito cell (hepatic stellate cell)" ,"Liver bud hepatic cell" ,"Memory T cell" ,"Migrating cancer stem cell" ,"Mucosal-associated invariant T cell" ,"Myofibroblast" ,
    "Airway secretory cell" ,"Anterior foregut endoderm cell" ,"Brush cell (Tuft cell)" ,"Ciliated cell" ,"Clara cell" ,"FOXN4+ cell" ,"Idiopathic pulmonary fibrosis cell" ,"Ionocyte cell" ,
    "Lung epithelial cell" ,"Malignant mesothelioma cell" ,"Mesothelial cell" ,"Mesothelioma cell" ,"Secretory cell" ,"SLC16A7+ cell" ,"Type II pneumocyte" ,"Follicular helper (Tfh) T cell" ,
    "Lymphatic endothelial cell" ,"CD4+ memory T cell" ,"Germinal center B cell" ,"Dopaminergic neuron" ,"Inflammatory cell" ,"Muscle satellite cell" ,"Myoblast" ,"Myotube" ,
    "Cardiomyocyte progenitor cell" ,"Myometrial stem cell" ,"Buccal epithelial stem cell" ,"Oral keratinocyte stem cell" ,"Germline stem cell" ,"Luteinizing granulosa cell" ,
    "Theca interna cell" ,"Germinal stem cell" ,"Ovarian germ stem cell" ,"Ovarian somatic cell" ,"Pluripotent very small embryonic-like cell" ,"Thecal cell" ,"Oviduct-derived stem cell" ,
    "Acinar cell" ,"Alpha cell" ,"Beta cell" ,"Delta cell" ,"Ductal cell" ,"Endocrine progenitor cell" ,"Pancreatic ductal stem cell" ,"Pancreatic polypeptide cell" ,"Pancreatic stem cell" ,
    "PP cell" ,"Periodontal ligament stem cell" ,"Periodontal stem cell" ,"Stromal stem cell" ,"Periosteum-derived progenitor cell" ,"Abnormal plasma cell" ,"Activated B cell" ,"CD16+ dendritic cell" ,
    "CD4-CD28- T cell" ,"CD4-CD28+ T cell" ,"CD4+ T helper cell" ,"CD4+CD25+ regulatory T cell" ,"CD8+ cytotoxic T cell" ,"Central memory T cell" ,"Circulating precursor cell" ,"Circulating stem like cell" ,
    "Class-switched memory B cell" ,"Double-negative B cell" ,"Double-negative memory B cell" ,"Effector CD8+ memory T (Tem) cell" ,"Effector memory T cell" ,"Effector regulatory T (Treg) cell" ,
    "Effector T cell" ,"IL-17Ralpha T cell" ,"Immature myeloid cell" ,"Induced regulatory T (Treg) cell" ,"Large granular lymphocyte" ,"Lymphoid stem cell" ,"Megakaryocyte progenitor cell" ,
    "Myeloid stem cell" ,"Naive CD8+ T cell" ,"Naive regulatory T (Treg) cell" ,"Non-switched memory B cell" ,"pro-Natural killer cell (pro-NK cell)" ,"Regulatory B cell" ,"Suppressive monocyte" ,
    "Suppressor T cell" ,"Extravillous trophoblast cell" ,"Placenta cell" ,"Syncytiotrophoblast" ,"Vascular endothelial cell" ,"Villous cytotrophoblast" ,"Flk1+ mesodermal cell" ,"Hepatic progenitor-like cell" ,
    "Primitive streak cell" ,"Colony-forming cell" ,"Early transit-amplifying prostate epithelial cell" ,"Late transit-amplifying prostate epithelial cell" ,"Luminal cell" ,"Prostate stem cell" ,
    "Glomerular epithelial cell" ,"Podocyte" ,"Muller cell" ,"Muller glia precursor cell" ,"Photoreceptor cell" ,"Retinal progenitor cell" ,"B1 cell" ,"Mucous acinar cell" ,"Serous acinar cell" ,
    "Bulge stem cell" ,"Limbal mesenchymal cell" ,"Adventitial cell" ,"Muscle-derived cell" ,"Myogenic endothelial cell" ,"Keratinocyte progenitor cell" ,"Small intestinal stem cell" ,"Enterocyte progenitor cell" ,
    "PROCR+ progenitor cell" ,"Tuft progenitor cell" ,"Cholinergic neuron" ,"Follicular dendritic cell" ,"HES1High progenitor cell" ,"Oxyntic progenitor cell" ,"Oxyntic stem cell" ,"Parietal progenitor cell" ,
    "Pit cell" ,"Pit progenitor cell" ,"Immature endothelial cell" ,"Submandibular gland stem cell" ,"Peritubular myoid cell" ,"Spermatogonium" ,"Testis somatic cell" ,"Cortical thymus epithelial cell" ,
    "Medullary thymus epithelial cell" ,"Erythroid cell" ,"Lymphoid-primed multipotent progenitor cell" ,"Multilymphoid progenitor cell" ,"Activated T cell" ,"CD4+ regulatory T cell" ,"CD8+ regulatory T cell" ,
    "Common myeloid progenitor" ,"Conventional dendritic cell" ,"Exhausted T cell" ,"Follicular B cell" ,"Follicular T cell" ,"Foxp3+IL-17+ T cell" ,"GABAergic neuron" ,"IgG memory B cell" ,"Immature neuron" ,
    "Induced pluripotent stem cell" ,"Intermediate progenitor cell" ,"Marginal zone B cell" ,"Megakaryocyte erythroid cell" ,"Natural memory B cell" ,"Neuroepithelial cell" ,"Neuronal progenitor cell" ,
    "Pyramidal cell" ,"Radial glial cell" ,"Serotonergic neuron" ,"Side-population cell" ,"Specialist antigen presenting cell" ,"T helper9 (Th9) cell" ,"Thymocyte" ,"Trophoblast stem cell" ,"Tumor-propagating cell" ,
    "Type I pneumocyte" ,"Urine-derived stem cell" ,"Vaginal cell" ,"Atypical memory B cell", "Well-established epicardial progenitor cell", "Mural cell", "Endothelial cell", "Endothelial cell 2", "Sinoatrial node (SAN) cell", 
    "Macrophage", "Cardiomyocyte", "M2 macrophage", "Cardiomyocyte 2","Cardiomyocyte 3", "Endothelial cell", "Fibroblast","Fibroblast 2", "Fibroblast 3", "Progenitor cell","Atrial cell", "Airway secretory cell","Alpha cell","Alveolar epithelial progenitor cell","Astrocyte","B cell","Basal cell","Beta cell"
  ]

  DiffExpCellTypes = [
    "Acinar cell", "Well-established epicardial progenitor cell", "Mural cell", "Endothelial cell", "Endothelial cell 2", "Sinoatrial node (SAN) cell", "Macrophage", "Cardiomyocyte", "M2 macrophage", "Cardiomyocyte 2","Cardiomyocyte 3", "Endothelial cell", "Fibroblast","Fibroblast 2", "Fibroblast 3", "Progenitor cell","Atrial cell", "Airway secretory cell","Alpha cell","Alveolar epithelial progenitor cell","Astrocyte","B cell","Basal cell","Beta cell","Blast cell","Brush cell (Tuft cell)","Cancer stem cell","Cancer stem-like cell","CD4+ cytotoxic T cell","CD4+ T cell","CD8+ T cell","Ciliated cell","Cytotoxic T cell","Delta cell","Dendritic cell","Dendritic cell progenitor","Endocrine cell","Endothelial cell","Epithelial cell","Epithelial progenitor cell","Excitatory Neurons","Fibroblast","FOXN4+ cell","Glial cell","Hematopoietic cell","Hematopoietic progenitor cell","Hematopoietic stem cell","Hepatocyte","Idiopathic pulmonary fibrosis cell","Inhibitory Neurons","Intestinal stem cell","Ionocyte cell","Ito cell (hepatic stellate cell)","Kupffer cell","Liver bud hepatic cell","Liver progenitor cell","Lung epithelial cell","Lymphocyte","Lymphoid-primed multipotent progenitor","M1 macrophage","M2 macrophage","Macrophage","Mast cell","Mast cell progenitor","Memory B cell","Mesenchymal cell","Mesenchymal stem cell","Mesenchymal stromal cell","Microglial cell","Monocyte","Monocyte derived dendritic cell","Mucosal-associated invariant T cell","Myeloid cell","Myeloid conventional dendritic cell","Myeloid dendritic cell","Myeloid-derived suppressor cell","NA","Naive T cell","Natural killer cell","Natural killer T (NKT) cell","Nephron epithelial cell","Neural stem cell","Neuroendocrine cell","Neuron","Neutrophil","Non-classical monocyte","Oligodendrocyte","Oligodendrocyte precursor cell","Pancreatic polypeptide cell","Plasma cell","Plasmacytoid dendritic cell","Platelet","PP cell","Regulatory T (Treg) cell","Secretory cell","SLC16A7+ cell","T cell","T helper cell","T1 (Transitional) B cell","Type II pneumocyte","Unkown","Urothelium cell"        ]

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
