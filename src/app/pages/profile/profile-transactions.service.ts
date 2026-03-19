import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TransactionDto } from './profile.models';

@Injectable({
  providedIn: 'root',
})
export class ProfileTransactionsService {
  private readonly http = inject(HttpClient);
  private readonly userId = '550e8400-e29b-41d4-a716-446655440000';

  public getTransactions(pageNumber = 1, pageSize = 20): Observable<TransactionDto[]> {
    const params = new HttpParams()
      .set('userId', this.userId)
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<TransactionDto[]>(`${environment.baseApiPath}/Transaction`, { params });
  }
}
