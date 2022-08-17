import { NgModule } from "@angular/core";
import {QuillModule} from "ngx-quill";

@NgModule({
  imports: [QuillModule.forRoot()],
  exports: [QuillModule]
})
export class SharedModule {
}
