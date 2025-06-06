import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxRangeSliderModule, DxTagBoxModule, DxAccordionModule, DxButtonGroupModule, DxTabsModule, DxDropDownButtonModule, DxTextBoxModule, DxTabPanelModule, DxVectorMapComponent, DxSelectBoxModule, DxVectorMapModule, DxListModule, DxAutocompleteModule } from 'devextreme-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgvComponent } from './components/igv/igv.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GeneCardComponent } from './components/gene-card/gene-card.component';
import { MapsComponent } from './components/maps/maps.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { DxiLayerModule, DxoSelectionModule } from 'devextreme-angular/ui/nested';
import { GoComponent } from './components/go/go.component';
import { LoginComponent } from './components/login/login.component';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SearchComponent,
    HomeComponent,
    IgvComponent,
    GeneCardComponent,
    MapsComponent,
    NavbarComponent,
    DocumentationComponent,
    GoComponent,
    LoginComponent,
    ChangelogComponent,
    FooterComponent
  ],
  imports: [
    DxFormModule,
    DxButtonModule,
    DxDropDownBoxModule,
    DxRangeSliderModule,
    DxTagBoxModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxAccordionModule,
    BrowserAnimationsModule,
    DxButtonGroupModule,
    DxTabsModule,
    DxoSelectionModule,
    DxDropDownButtonModule,
    DxTextBoxModule,
    DxTabPanelModule,
    DxVectorMapModule,
    DxListModule,
    DxSelectBoxModule,
    DxAutocompleteModule,
    DxiLayerModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
