import { Component, Input } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'ShowMessage',
    template: `<p-growl [(value)]="msgs" (life)="3000"></p-growl>`
})
export class MessageService {
    @Input() GrowlMessage: string;
    msgs: Message[] = [];

    displayMessages(msg: any[], severity: string, summary: string) {
        msg.forEach((item, index) => {
            this.msgs.push({ severity: severity, summary: summary, detail: item });
        });
    }
}
