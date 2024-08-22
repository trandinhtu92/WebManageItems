/************************************************************************/
/* All Rights Reserved. Copyright (C) Sorimachi Co., Ltd.               */
/************************************************************************/
/* File Name    : app.module.ts                                         */
/* Function     : App module class                                      */
/* System Name  : Web Hanbai  V1.0.0                                    */
/* Create       : NgocTon 2022/05/17                                    */
/* Update       :                                                       */
/* Comment      :                                                       */
/************************************************************************/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,  // Ensure RouterModule is included if using routing
    AppRoutingModule,  // Import the routing module
    RouterOutlet,
  ],
  providers: [],
  })
  export class AppModule {}
  