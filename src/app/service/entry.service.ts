import { FpsService } from './fps.service';
import { HttpClient } from '@angular/common/http';
import { IEntry } from '../entry/entry';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EntryService extends FpsService {
    private entryUrl = this.baseUrl + '/entry';

    constructor(private http: HttpClient) {
        super();
    }

    createEntry(entry: IEntry): Observable<IEntry> {
        return this.http.post<IEntry>(this.entryUrl, entry, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    updateEntry(entry: IEntry): Observable<IEntry> {
        return this.http.put<IEntry>(this.entryUrl, entry, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deleteEntry(entryId: number): Observable<{}> {
        return this.http.delete(`${this.entryUrl}/${entryId}`).pipe(
            catchError(this.handleError)
        );
    }
}
