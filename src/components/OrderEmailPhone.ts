import {Form} from "./common/Form";
import {IOrderEmailPhone} from "../types";
import {IEvents} from "./base/events";

export class OrderEmailPhone extends Form<IOrderEmailPhone> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`orderEmailPhone:submit`);
        });
    }

    protected onInputChange(field: keyof IOrderEmailPhone, value: string) {
        this.events.emit('orderEmailPhone:change', {
            field,
            value
        });
    }
}