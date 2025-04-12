import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enumToNormalWord, hasValues, Language } from 'projects/inventory-core/src/lib/models';
import { catchError, forkJoin, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    constructor(private http: HttpClient) { }
    selectedCountry = "in";
    selectedLanguage = "en"
    data: { [index: string]: string } = {};

    transform = (key: string) => this.data[key] || enumToNormalWord(key);

    availableLanguages: Language[] = [
        { language: "ta", country: 'in', name: "தமிழ்" },
        { language: "en", country: 'in', name: "English" },
        { language: "hi", country: 'in', name: "हिंदी" },
        { language: "te", country: 'in', name: "తెలుగు" },
    ]

    getCurrentLanguage() {
        let lang: Language = {} as any;
        if (hasValues(localStorage.getItem("language"))) {
            lang.language = localStorage.getItem("language")
            lang.country = localStorage.getItem("country")
        } else {
            lang.language = "en";
            lang.country = "in";
        }
        return lang;
    }

    loadLanguage = () => {
        return new Observable((observer) => {
            forkJoin({
                defaultLanguage: this.http.get<any>(`assets/languages/default.json`),
                selectedLanguage: this.http.get<any>(`assets/languages/${this.selectedCountry}/${this.selectedLanguage}.json`).pipe(catchError(error => { return of({}) }))
            }).subscribe({
                next: (res) => {
                    this.data = { ...res.defaultLanguage, ...res.selectedLanguage };
                    observer.next(this.data);
                    observer.complete();
                }, error: (err) => {
                    observer.error(err);
                    observer.next(this.data);
                    observer.complete();
                }
            })
        });
    }

    setLanguage = (lang?: Language) => {
        if (hasValues(lang.language) && hasValues(lang.country)) {
            if (localStorage.getItem("language") == lang.language && localStorage.getItem("country") == lang.country) {
                return;
            }
            this.selectedLanguage = lang.language;
            this.selectedCountry = lang.language;
            localStorage.setItem("language", lang.language);
            localStorage.setItem("country", lang.country);
            let urls = location.pathname.split("/").filter(x => !!x)
            if (urls.length >= 1) {
                urls[0] = lang.country;
                urls[1] = lang.language;
                location.pathname = "/" + urls.join("/");
            }
        }
    }
}