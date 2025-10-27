import { AfterContentInit, Component } from "@angular/core";
import { ToggleThemeService } from "../Services/Theme/ToggleTheme.Service";

@Component({
    selector: 'app-root',
    templateUrl: './MasterPage.html',
    styleUrl: './MasterPage.css'
})
export class MasterPageComponent implements AfterContentInit {
  currentTheme: string | null = "";
  
    constructor(private themeService: ToggleThemeService) { }

    ngAfterContentInit(): void {
        var storedTheme = 'light'
        if (localStorage != undefined)
            storedTheme = localStorage.getItem("Theme");
        this.currentTheme = storedTheme ? storedTheme : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.themeService.setCurrentTheme(newTheme);
        this.currentTheme = newTheme;
        localStorage.setItem("Theme", newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }
}