import { ToastrService } from "ngx-toastr";

export class ToastrWrapper {
    static Toastr: ToastrService

    private constructor() {}

    static setToastr(toastr: ToastrService) {
        this.Toastr = toastr
    }
}