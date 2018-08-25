import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IPlan } from '../plan/plan';
import { FpsService } from './fps.service';

@Injectable({ providedIn: 'root' })
export class PlanService extends FpsService {
    private planUrl = this.baseUrl + '/plan';

    constructor(private http: HttpClient) {
        super();
    }

    getPlans(): Observable<IPlan[]> {
        return this.http.get<IPlan[]>(this.planUrl).pipe(
            catchError(this.handleError)
        );
    }

    savePlan(plan: IPlan): boolean {
        return false;
    }

    deletePlan(id: number): boolean {
        return false;
    }

}
