import { NgModule } from '@angular/core';
import { PlanComponent } from './plan.component';
import { EntryListComponent } from '../entry/entry-list.component';
import { RouterModule } from '@angular/router';
import { EntryListGuard } from '../entry/entry-list.guard';
import { ProgressModule } from '../progress/progress.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'plans', component: PlanComponent },
      {
        path: 'plan/:id', canActivate: [EntryListGuard],
        component: EntryListComponent
      },
    ]),
    ProgressModule
  ],
  declarations: [
    PlanComponent,
    EntryListComponent,
  ]
})
export class PlanModule { }
