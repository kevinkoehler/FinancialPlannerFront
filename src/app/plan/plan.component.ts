import { Component, OnInit } from '@angular/core';

import { IPlan } from './plan';
import { PlanService } from '../service/plan.service';
import { IEntry } from '../entry/entry';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'fp-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  pageTitle = 'Saved Plans';
  planFilterText = '';
  plans: IPlan[];
  filteredPlans: IPlan[];
  errorMessage;

  constructor(private planService: PlanService) { }

  get planFilter(): string {
    return this.planFilterText;
  }

  set planFilter(value: string) {
    this.planFilterText = value;
    this.filteredPlans = this.planFilterText.length ? this.performFilter(this.planFilter) : this.plans;
  }

  performFilter(filterBy: string): IPlan[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.plans.filter((plan: IPlan) =>
      plan.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleDetails(plan): void {
    plan.showDetails = !plan.showDetails;
    if (plan.showDetails && !plan.calculated) {
      this.planService.getEntries(plan.id).subscribe(
        entries => {
          this.calculateTotals(plan, entries);
        }
      );
    }
  }

  calculateTotals(plan: IPlan, entries: IEntry[]): void {
    plan.monthlyIncomeTotal = 0;
    plan.monthlyExpensesTotal = 0;
    plan.monthlySavings = 0;
    plan.yearlyIncomeTotal = 0;
    plan.yearlyExpensesTotal = 0;
    plan.yearlySavings = 0;
    for (const entry of entries) {
      if (entry.type === 'Income') {
        if (entry.frequency === 'Monthly') {
          plan.monthlyIncomeTotal += entry.amount;
          plan.yearlyIncomeTotal += entry.amount * 12;
        } else if (entry.frequency === 'Annually') {
          plan.yearlyIncomeTotal += entry.amount;
        }
      } else if (entry.type === 'Expense') {
        if (entry.frequency === 'Monthly') {
          plan.monthlyExpensesTotal += entry.amount;
          plan.yearlyExpensesTotal += entry.amount * 12;
        } else if (entry.frequency === 'Annually') {
          plan.yearlyExpensesTotal += entry.amount;
        }
      }
    }
    plan.monthlySavings = plan.monthlyIncomeTotal - plan.monthlyExpensesTotal;
    plan.yearlySavings = plan.yearlyIncomeTotal - plan.yearlyExpensesTotal;
    plan.calculated = true;
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
