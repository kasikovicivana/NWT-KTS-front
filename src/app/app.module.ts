import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { LoginSocialComponent } from './components/login/login-social/login-social.component';
import { MapComponent } from './components/map/map.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { MailModalComponent } from './components/mail-modal/mail-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { StepperModalComponent } from './components/modals/stepper-modal/stepper-modal.component';
import { PurchaseTokensComponent } from './components/purchase-tokens/purchase-tokens.component';
import { SuccessfulPaymentComponent } from './components/purchase-tokens/confirm-payment/successful-payment.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CollapseListComponent } from './components/collapse-list/collapse-list.component';
import { UserBlockCardComponent } from './components/user-block-card/user-block-card.component';
import { BlockUserComponent } from './components/block-user/block-user.component';
import { PaginationComponent } from './components/shared/components/pagination/pagination.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { GradeModalComponent } from './components/grade-modal/grade-modal.component';
import {
  StarRating,
  StarRatingConfigService,
  StarRatingModule,
} from 'angular-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginSocialComponent,
    MapComponent,
    ProfileViewComponent,
    ActivateAccountComponent,
    PasswordChangeComponent,
    MailModalComponent,
    HomepageComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepperModalComponent,
    PurchaseTokensComponent,
    SuccessfulPaymentComponent,
    SideBarComponent,
    CollapseListComponent,
    UserBlockCardComponent,
    BlockUserComponent,
    PaginationComponent,
    NoteModalComponent,
    GradeModalComponent,
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
