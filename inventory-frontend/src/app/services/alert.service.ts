import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from "ng-zorro-antd/message";
import { NzButtonType } from "ng-zorro-antd/button";
import { hasValues } from "projects/inventory-core/src/lib/models";

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private modal: NzModalService, private message: NzMessageService) { }

    confirmation(info: { message: string, title?: string, buttonType?: NzButtonType, isDelete?: boolean, centered?: boolean }): Observable<boolean> {
        return new Observable(obx => {
            this.modal.confirm({
                nzTitle: info.title,
                nzContent: info.message,
                nzCentered: !!info.centered,
                nzWidth: 600,
                nzOkText: 'Yes',
                nzCancelText: 'No',
                nzOkType: info.buttonType || 'primary',
                nzOkDanger: hasValues(info.isDelete) ? info.isDelete : false,
                nzOnOk: () => { obx.next(true); obx.complete() },
                nzOnCancel: () => { obx.complete() }
            });
        })
    }

    error = (info: { msg: string, duration?: number }) => {
        const { msg, duration = 4000 } = info;
        this.message.error(msg, { nzDuration: duration })
    }

    warning = (info: { msg: string, duration?: number }) => {
        const { msg, duration = 4000 } = info;
        this.message.warning(msg, { nzDuration: duration })
    }

    info = (info: { msg: string, duration?: number }) => {
        const { msg, duration = 4000 } = info;
        this.message.info(msg, { nzDuration: duration })
    }

    success = (info: { msg: string, duration?: number }) => {
        const { msg, duration = 4000 } = info;
        this.message.success(msg, { nzDuration: duration })
    }
}