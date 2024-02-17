import {Form} from "./common/Form";
import {IOrderWayAddress} from "../types";
import {IEvents} from "./base/events";


export class OrderWayAddress<T> extends Form<IOrderWayAddress> {
    protected _wayOn?: HTMLElement;
    protected _wayOff?: HTMLElement;
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._wayOn = this.container.querySelector('.online');
        this._wayOff = this.container.querySelector('.offline');
        this._wayOn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this._wayOn.classList.add('button_alt-active');
            this._wayOff.classList.remove('button_alt-active');
            this.onInputChange('payment', 'online');
        });
        this._wayOff.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this._wayOff.classList.add('button_alt-active');
            this._wayOn.classList.remove('button_alt-active');
            this.onInputChange('payment', 'offline');
        }); 
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`orderWayAddress:submit`);
        });
    }
    protected onInputChange(field: keyof IOrderWayAddress, value: string) {
        this.events.emit('orderWayAddress:change', {
            field,
            value
        });
    }
}
