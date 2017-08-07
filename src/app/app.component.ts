(window as any).handleOpenURL = (url: string) => {
    (window as any).handleOpenURL_LastURL = url;
};

import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'List', component: ListPage}
        ];

        (window as any).handleOpenURL = (url: string) => {
            setTimeout(() => {
                this.handleOpenUrl(url);
            }, 0);
        };

        // check if app was opened by custom url scheme
        const lastUrl: string = (window as any).handleOpenURL_LastURL || "";
        if (lastUrl && lastUrl !== "") {
            delete (window as any).handleOpenURL_LastURL;
            this.handleOpenUrl(lastUrl);
        }
    }

    private handleOpenUrl(url: string) {
        // custom url parsing, etc...

        // navigate to page with reactive forms
        // this.navCtrl.push(MyReactiveFormsPage, { param: "my param" });
        alert(url);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
