import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { TaskEditComponent } from "./components/task-edit/task-edit.component";
// import { TaskDeleteComponent } from "./components/task-delete/task-delete.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskItemComponent,
    TaskEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
