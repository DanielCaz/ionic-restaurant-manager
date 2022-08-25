import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Table } from './table';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor(private http: HttpClient) {}

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${environment.apiUrl}/tables`);
  }

  addTable(table: Table): Observable<Table> {
    return this.http.post<Table>(`${environment.apiUrl}/tables`, table);
  }

  deleteTable(table: Table): Observable<Table> {
    // eslint-disable-next-line no-underscore-dangle
    return this.http.delete<Table>(`${environment.apiUrl}/tables/${table._id}`);
  }

  updateTable(table: Table): Observable<Table> {
    return this.http.patch<Table>(
      // eslint-disable-next-line no-underscore-dangle
      `${environment.apiUrl}/tables/${table._id}`,
      table
    );
  }
}
