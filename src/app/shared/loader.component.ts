import {Input, Component} from '@angular/core';
@Component({
template: `
<div class="loader" ><img src="assets/loader.gif" /></div>
`
})
export class LoaderComponent{
    @Input() loading = false;
}
