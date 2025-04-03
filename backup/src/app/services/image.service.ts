import { Injectable } from '@angular/core'    
@Injectable({
  providedIn: 'root'
})
export class ImageService {    
    allImages: any[] = [];    
    
    getImages() {    
        return this.allImages = images_delatils.slice(0);    
    }    
    
    getImage(id: number) {    
        return images_delatils.slice(0).find(Images => Images.id == id)    
    }

    getLogoImages(){
        return images_delatils.slice(1,8)
    }
}    
const images_delatils = [    
    { "id": 1, "name": 'logo', "url": "assets/images/test_logo.png" },    
    { "id": 2, "name": '0-9', "url": "assets/images/0-9.png" },    
    { "id": 3, "name": '10-19', "url": "assets/images/10-19.png" },    
    { "id": 4, "name": '20-29', "url": "assets/images/20-29.png" },    
    { "id": 5, "name": '30-49', "url": "assets/images/30-49.png" },    
    { "id": 6, "name": '50-64', "url": "assets/images/50-64.png" },    
    { "id": 7, "name": '65-99', "url": "assets/images/65-99.png" },    
    { "id": 8, "name": '100+', "url": "assets/images/100+.png" },    
]    
