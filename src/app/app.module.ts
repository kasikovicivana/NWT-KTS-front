import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { AppRoutingModule } from '../modules/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../modules/app/app.component';
import { MapComponent } from '../modules/shared/components/map/map.component';
import { LoginComponent } from '../modules/auth/pages/login/login.component';
import { NavbarComponent } from '../modules/app/components/navbar/navbar.component';
import { RegistrationComponent } from '../modules/auth/pages/registration/registration.component';
import { LoginSocialComponent } from '../modules/auth/components/login-social/login-social.component';
import { HomepageComponent } from '../modules/client/pages/homepage/homepage.component';
import { SideBarComponent } from '../modules/client/components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginSocialComponent,
    MapComponent,
    HomepageComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    SocialLoginModule,
    OverlayModule,
    NgStepperModule,
    CdkStepperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdbCheckboxModule,
    MdbRadioModule,
    StarRatingModule.forRoot(),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '876431757912-4d80ppb585036idf1r63oild8lled1un.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2042751709255530'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    StarRatingConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
