import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";


export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
    title: string;             
    description?: string | string[];
    image?: string;
    category?: string;
    price?: string;
    button?: boolean; 
    buttonStatus: T;  
    index: number; 
}

export class Card<T> extends Component<ICard<T>> {
    protected _title: HTMLElement;
    protected _price?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _status: boolean;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
        this._button = container.querySelector(`.${blockName}__button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }
 
    getPrice() {  
        const priceText = this._price.textContent;
        return parseInt(priceText);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set price(value: string) {
        this.setText(this._price, value);
    }

    get price(): string {
        return this._price.textContent || '';
    }

    set button(value: boolean) {
        console.log(this.getPrice());
        if (!this.getPrice()) {
            this._button.setAttribute('disabled', 'disabled');
        }
        if (value) {
            this.setText(this._button, 'Удалить');
        } else {
            this.setText(this._button, 'В корзину');
        }
        this._status = value;
    }
}

export interface ICardContainer<T> {
    num: number;
}

export class CardContainer<T> extends Card<ICardContainer<T>> {
    protected _index?: HTMLElement;

    constructor(blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(blockName, container, actions);
        this._index = this.container.querySelector('.basket__item-index');
    }

    set index(value: number) {
        this.setText(this._index, value.toString());
    }
}

export interface ICardPreview<T> {
    description: string | string[];
    image: string;
    category: string;
}

export class CardPreview<T> extends Card<ICardPreview<T>> {
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category?: HTMLElement;

    constructor(blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(blockName, container, actions);
        this._description = container.querySelector(`.${blockName}__description`);
        this._category = ensureElement<HTMLElement>(`.${blockName}__category`, this.container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, this.container);
    }

    set category(value: string) {
        this.setText(this._category, value);
        switch (value) {
            case 'другое':
                this._category.classList.add('card__category_other');
                break;
            case 'дополнительное':
                this._category.classList.add('card__category_additional');
                break;
            case 'кнопка':
                this._category.classList.add('card__category_button');
                break;
            case 'хард-скил':
                this._category.classList.add('card__category_hard');
                break;
            default:
                this._category.classList.add('card__category_soft');
                break;
        }
    
        this._category.classList.add('modal_active');
    }

    get category(): string {
        return this._category.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string | string[]) {
        if (Array.isArray(value)) {
            this._description.replaceWith(...value.map(str => {
                const descTemplate = this._description.cloneNode() as HTMLElement;
                this.setText(descTemplate, str);
                return descTemplate;
            }));
        } else {
            this.setText(this._description, value);
        }
    }
}


