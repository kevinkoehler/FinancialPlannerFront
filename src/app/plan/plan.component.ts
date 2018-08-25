import { Component, OnInit } from '@angular/core';

import { IPlan } from './plan';
import { PlanService } from '../service/plan.service';
import { IEntry } from '../entry/entry';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-fp-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  pageTitle = 'Saved Plans';
  private _planFilter = '';
  private plans: IPlan[];
  filteredPlans: IPlan[];
  entries: IEntry[];
  monthlyIncomeTotal = 0;
  monthlyExpensesTotal = 0;
  monthlySavings = 0;
  yearlyIncomeTotal = 0;
  yearlyExpensesTotal = 0;
  yearlySavings = 0;
  private errorMessage;

  constructor(private planService: PlanService,
    private entryService: EntryService) { }

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
    if (plan.showDetails && this.entries == null) {
      this.planService.getEntries(plan.id).subscribe(
        entries => {
          this.entries = entries;
          this.calculateTotals();
        }
      );
    }
  }

  calculateTotals(): void {
    for (const entry of this.entries) {
      if (entry.type === 'Income') {
        if (entry.frequency === 'Monthly') {
          this.monthlyIncomeTotal += entry.amount;
          this.yearlyIncomeTotal += entry.amount * 12;
        } else if (entry.frequency === 'Annually') {
          this.yearlyIncomeTotal += entry.amount;
        }
      } else if (entry.type === 'Expense') {
        if (entry.frequency === 'Monthly') {
          this.monthlyExpensesTotal += entry.amount;
          this.yearlyExpensesTotal += entry.amount * 12;
        } else if (entry.frequency === 'Annually') {
          this.yearlyExpensesTotal += entry.amount;
        }
      }
    }
    this.monthlySavings = this.monthlyIncomeTotal - this.monthlyExpensesTotal;
    this.yearlySavings = this.yearlyIncomeTotal - this.yearlyExpensesTotal;
  }

  ngOnInit(): void {
    this.planService.getPlans().subscribe(
      plans => {
        this.plans = plans;
        this.filteredPlans = this.plans;
      },
      error => this.errorMessage = <any>error
    );
  }
}
