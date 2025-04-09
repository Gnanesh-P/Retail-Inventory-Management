// gallery.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    constructor(private http: HttpClient) { }
    country = "in";
    language = "en"
    data: { [index: string]: string } = {};

    getAllLanguage = () => {
        return new Observable((observer) => {
            this.http.get<any>(`assets/languages/${this.country}/${this.language}.json`).subscribe((res) => {
                this.data = res;
                observer.next(this.data);
                observer.complete();
            });
        });
    }
}