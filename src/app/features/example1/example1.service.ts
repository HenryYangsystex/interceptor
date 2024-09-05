import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Example1Service {
  constructor(private http: HttpClient) {}

  // Method to get local file data
  getLocalFileData(): Observable<any> {
    // Adjust the URL path to the local file location
    const url = 'assets/file.json'; // Example path
    return this.http.get<any>(url);
  }
}
