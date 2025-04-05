import { Subject } from "rxjs";

export class Drawer {
    events: Subject<"OPEN" | "CLOSE" | "CREATE" | "UPDATE" | "DELETE"> = new Subject();
    data: any


    title = "";
    open(title?: string, data?: any) {
        if (title)
            this.title = title;
        if (data)
            this.data = data;
        this.visible = true
        if (window.screen.availWidth <= 800) {
            this.width = window.screen.availWidth;
        }
        this.events.next("OPEN")
    }
    visible = false;
    close() {
        this.visible = false;
        this.title = null;
        this.data = null;
        this.events.next("CLOSE")
    }

    width: number | string = 800;
    loading: boolean = false
}

export class PopupModal extends Drawer { }