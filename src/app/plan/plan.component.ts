import { Component, OnInit } from '@angular/core';

import { IPlan } from './plan';
import { PlanService } from '../service/plan.service';

@Component({
  selector: 'app-fp-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  private privatepageTitle = 'Saved Plans';
  private _planFilter = '';
  private plans: IPlan[];
  private filteredPlans: IPlan[];
  private errorMessage;

  constructor(private planService: PlanService) {}

  get planFilter(): string {
    return this._planFilter;
  }

  set planFilter(value: string) {
    this._planFilter = value;
    this.filteredPlans = this._planFilter.length ? this.performFilter(this.planFilter) : this.plans;
  }

  performFilter(filterBy: string): IPlan[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.plans.filter((plan: IPlan) =>
      plan.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleDetails(plan): void {
    plan.showDetails = !plan.showDetails;
  }

  ngOnInit(): void {
    this.planService.getPlans().subscribe(
      plans =>  {
        this.plans = plans;
        this.filteredPlans = this.plans;
      },
      error => this.errorMessage = <any>error
    );
    this.filteredPlans = this.plans;
  }
}
