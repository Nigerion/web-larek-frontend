import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";

export interface ISuccess {     
    sumPrice: string;          
}

export interface ISuccessActions {    
    onClick: () => void;              
}

export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;
    protected _sumPrice: HTMLElement;
    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._sumPrice = ensureElement<HTMLElement>('.order-success__description', this.container);
        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }
    set sumPrice (value: string) {
        this.setText(this._sumPrice, `Списано ${value} синапсов`);
    }
}