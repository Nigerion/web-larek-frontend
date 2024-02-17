import {Model} from "./base/Model";
import {FormErrors, IAppState, ILotItem, IOrder,IOrderWayAddress} from "../types";

export type CatalogChangeEvent = {
    catalog: LotItem[]
};
export class LotItem extends Model<ILotItem> {
    about: string;
    description: string;
    id: string;
    image: string;
    title: string;
    price: number;
    status: boolean;
    category: string;
}

export class AppState extends Model<IAppState> {
    basket: LotItem[];
    catalog: LotItem[];
    order: IOrder = {
        address: '',
        payment: '',
        email: '',
        phone: '',
        total: 0,
        items: []
    };
    preview: string | null;
    formErrors: FormErrors = {};

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setCatalog(items: ILotItem[]) {
        this.catalog = items.map(item => new LotItem(item, this.events));
        this.emitChanges('card:changed', { catalog: this.catalog });
    }

    setPreview(item: LotItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    getActiveLots(): LotItem[] {
        return this.catalog
            .filter(item => item.status === true);
    }

    getBasket(): LotItem[] {
        return this.basket
            .filter(item => item.status === true);
    }


    setOrderField(field: keyof IOrderWayAddress, value: string) {
        this.order[field] = value;
    }

    removeOrder(id: string) {
      const index = this.order.items.indexOf(id);
      if (index !== -1) {
        this.order.items.splice(index, 1);
      } 
    }

    addingInOrder(id: string) {
        this.order.items.push(id);
    }


    validateOrderWayAddress() {
        const errors: typeof this.formErrors = {};
        if (!this.order.payment) {
            errors.email = 'Необходимо выбрать способ оплаты';
        }
        if (!this.order.address) {
            errors.email = 'Необходимо заполнить адрес';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }


    validateOrderEmailPhone() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('orderEmailPhonee:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    clearOrder() {
        this.order.items.forEach(id => {
            this.removeOrder(id);
        });
    }

}