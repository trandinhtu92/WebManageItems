import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpErrorInterceptor } from '../Interceptor/HttpErrorInterceptor';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor, // Provide your interceptor
      multi: true // This is necessary to allow multiple interceptors
    }
  ],
  standalone:true
})
export class AppComponent {
  title = 'ItemControlAngular';

}
