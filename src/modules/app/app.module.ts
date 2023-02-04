import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { StarRatingConfigService } from 'angular-star-rating';
import { ClientModule } from '../client/client.module';
import { AdminModule } from '../admin/admin.module';
import { DriverModule } from '../driver/driver.module';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import 'ngx-toastr/toastr';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    ClientModule,
    AdminModule,
    DriverModule,
    AuthModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    OverlayModule,
    NgStepperModule,
    CdkStepperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdbCheckboxModule,
    MdbRadioModule,
    SharedModule,
  ],
  providers: [StarRatingConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
