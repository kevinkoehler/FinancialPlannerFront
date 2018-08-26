import { Component, OnInit } from '@angular/core';
import { IPlan } from '../plan/plan';
import { IEntry } from './entry';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../service/plan.service';

@Component({
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  pageTitle = 'Entries';
  plan: IPlan;
  entries: IEntry[];
  incomeEntries: IEntry[] = [];
  expenseEntries: IEntry[] = [];
  errorMessage;

  constructor(private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planService.getPlanById(id).subscribe(
      plan => {
        this.plan = plan;
      }
    );
    this.planService.getEntries(id).subscribe(
      entries => {
        this.entries = entries;
        for (const entry of this.entries) {
          if (entry.type === 'Income') {
            this.incomeEntries.push(entry);
          } else if (entry.type === 'Expense') {
            this.expenseEntries.push(entry);
          }
        }
      },
      error => this.errorMessage = <any>error
    );
  }

  onBack(): void {
    this.router.navigate(['/plans']);
  }
}
