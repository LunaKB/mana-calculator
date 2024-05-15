import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

export class CasterFormGroup {
    FormGroup: FormGroup
    HasId = false
    Id = ''
    CasterName = ''
    ManaPoints = 0
    Mind = 0
    Source = 0
    Will = 0

    constructor() {
        this.FormGroup = new FormBuilder().group({})
        this.FormGroup.addControl('CasterName', new FormControl())
        this.FormGroup.addControl('Mana', new FormControl())
        this.FormGroup.addControl('Mind', new FormControl())
        this.FormGroup.addControl('Source', new FormControl())
        this.FormGroup.addControl('Will', new FormControl())
    }
}