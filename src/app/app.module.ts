import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CardComponent} from './card/card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes  } from '@angular/router';
import { OverviewExampleDialogComponent} from './overview-example-dialog/overview-example-dialog.component';
import {DialogDataExampleComponent} from './overview-example-dialog/overview-example-dialog.component';

import 'hammerjs';
import { MaterialModule} from './material';

 import { ToolbarComponent } from './toolbar/toolbar.component';
 import { SearchComponent } from './search/search.component';
import { MyNavComponent } from './my-nav/my-nav.component';

import { DashComponent } from './dash/dash.component';
import { MaterialIconComponent } from './material-icon/material-icon.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { ProjectsComponent } from './projects/projects.component';


  const appRotes: Routes = [
  {path: 'projects', component: ProjectsComponent},
  {path: 'youtube', component: SearchComponent},
  {path: 'home', component: CardComponent},
  {path: 'sandbox', component: SandboxComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ToolbarComponent,
    SearchComponent,
    MyNavComponent,
    DashComponent,
    MaterialIconComponent,
    OverviewExampleDialogComponent,
    DialogDataExampleComponent,
    SandboxComponent,
    ProjectsComponent
   ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRotes),
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogDataExampleComponent]
})
export class AppModule { }
