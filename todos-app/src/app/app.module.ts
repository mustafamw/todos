import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
import { TodosAddComponent } from './components/todos-add/todos-add.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TodosItemComponent } from './components/todos-list/todos-item/todos-item.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { CompletedComponent } from './components/completed/completed.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TodosAddComponent,
    TodosListComponent,
    TodosItemComponent,
    AlertsComponent,
    CompletedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
