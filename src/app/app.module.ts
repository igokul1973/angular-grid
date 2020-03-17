import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpInterceptorService } from "./api/http.interceptor.service";

import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { CowsComponent } from "./cows/cows.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddCowComponent } from './add-cow/add-cow.component';
import { AddCowDialogComponent } from './add-cow/add-cow-dialog/add-cow-dialog.component';

@NgModule({
    declarations: [AppComponent, CowsComponent, AddCowComponent, AddCowDialogComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
