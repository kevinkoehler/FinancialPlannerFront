import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {IPlan} from '../plan/plan';
import {FpsService} from './fps.service';
import {IEntry} from '../entry/entry';

@Injectable({providedIn: 'root'})
export class PlanService extends FpsService {
  private planUrl = this.baseUrl + '/plan';

  constructor(private http: HttpClient) {
    super();
  }

  getPlans(): Observable<IPlan[]> {
    return this.http
      .get<IPlan[]>(this.planUrl)
      .pipe(catchError(this.handleError));
  }

  getPlanById(planId: number): Observable<IPlan> {
    return this.http
      .get<IPlan>(`${this.planUrl}/${planId}`)
      .pipe(catchError(this.handleError));
  }

  getEntries(planId: number): Observable<IEntry[]> {
    return this.http
      .get<IEntry[]>(`${this.planUrl}/${planId}/entries`)
      .pipe(catchError(this.handleError));
  }

  createPlan(plan: IPlan): Observable<IPlan> {
    return this.http
      .post<IPlan>(this.planUrl, plan, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updatePlan(plan: IPlan): Observable<IPlan> {
    return this.http
      .put<IPlan>(this.planUrl, plan, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePlan(planId: number): Observable<{}> {
    return this.http
      .delete(`${this.planUrl}/${planId}`)
      .pipe(catchError(this.handleError));
  }
}
