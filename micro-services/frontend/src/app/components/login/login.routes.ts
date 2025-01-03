import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";

// for empty path show the login component class
const routes:Routes = [
    {path:'',component:LoginComponent}
];

// Configure child path and export
@NgModule({imports:[RouterModule.forChild(routes)],
            exports: [RouterModule]
})

export class LoginRoutingModule {}