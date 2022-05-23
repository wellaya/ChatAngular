import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError, of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { environment } from 'src/environments/environment';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class ChatService {  
  private chatUrl = environment.baseUrl + '/api/Chat';  
  
  constructor(private http: HttpClient) { }  
  
  initChat(id: string): Observable<void> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.chatUrl, { connectionId: id}, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  private handleError(err: any) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
}  