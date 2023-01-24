import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { DriveHistoryTableComponent } from './components/drive-history-table/drive-history-table.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CommonModule } from '@angular/common';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  declarations: [DriveHistoryTableComponent],
  exports: [DriveHistoryTableComponent],
  imports: [MdbRippleModule, CommonModule],
})
export class SharedModule {}
