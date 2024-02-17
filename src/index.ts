import './scss/styles.scss';
import {EventEmitter} from "./components/base/events";
import {AuctionAPI} from "./components/AuctionAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {AppState, CatalogChangeEvent, LotItem} from "./components/AppData";
import {CardContainer, CardPreview} from "./components/Card";
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import {Modal} from "./components/common/Modal";
import {Page} from "./components/Page";
import {Basket} from "./components/common/Basket";
import {OrderWayAddress} from "./components/OrderWayAddress";
import {OrderEmailPhone} from "./components/OrderEmailPhone";
import {IOrderEmailPhone, IOrderWayAddress} from "./types";
import {Success} from "./components/common/Success";


const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderAddressTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
export const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderEmailPhone = new OrderEmailPhone(cloneTemplate(orderContactsTemplate), events);
const orderWayAddress = new OrderWayAddress(cloneTemplate(orderAddressTemplate), events);

events.on<CatalogChangeEvent>('card:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new CardPreview('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            category: item.category,
            title: item.title,
            image: item.image,
            price: item.price !== null ? item.price + " синапсов" : "Бесценно",
        });
    });

});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});


events.on('basket:open', () => {
    modal.render({
        content: createElement<HTMLElement>('div', {}, [
            basket.render({
                button: appData.order.items
            })
        ])
    });
}); 

events.on('card:select', (item: LotItem) => {
    appData.setPreview(item);
});

events.on('orderWayAddress:change', (data: { field: keyof IOrderWayAddress, value: string }) => {
    appData.setOrderField(data.field, data.value);
    orderWayAddress.valid = appData.validateOrderWayAddress();
});

events.on('orderEmailPhone:change', (data: { field: keyof IOrderEmailPhone, value: string }) => {
    appData.setOrderField(data.field, data.value);
    orderEmailPhone.valid = appData.validateOrderEmailPhone();
});

events.on('orderWayAddress:submit', () => {
  events.emit('orderEmailPhone:open')
});

events.on('orderEmailPhone:open', () => {
    modal.render({
        content: orderEmailPhone.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    });
});

events.on('orderWayAddress:open', () => {
    modal.render({
        content: orderWayAddress.render({
            payment: 'offline', 
            address: '',
            valid: false,
            errors: []
        })
    });
});

events.on('orderEmailPhonee:change', (errors: Partial<IOrderEmailPhone>) => {
    const { email, phone } = errors;
    orderEmailPhone.valid = !email && !phone;
    orderEmailPhone.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

events.on('orderWayAddress:change', (errors: Partial<IOrderWayAddress>) => {
    const { payment, address } = errors;
    orderWayAddress.valid = !payment && !address;
    orderWayAddress.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});


events.on('card: changes', (item: LotItem) => { 
    item.status = true;
    appData.addingInOrder(item.id); 
    events.emit('basket: render');
  });

events.on('card: changeStatus', (item: LotItem) => { 
    item.status = false;
    appData.removeOrder(item.id);
    events.emit('basket: render');
});

events.on('basket: render', () =>  { 
    page.counter = appData.getActiveLots().length; 
    basket.items = appData.getActiveLots().map((item, index) => {
        const card = new CardContainer('card',cloneTemplate(cardBasketTemplate), {
            onClick: ()=> {
                events.emit('card: changeStatus', item);
            }
        });
        return card.render({
            title: item.title,
            price: item.price !== null ? item.price + " синапсов" : "Бесценно",
            index: index +1,
        });
    });
    basket.selected = appData.order.items;
    basket.total = appData.getTotal();
})


events.on('basket: remove', () =>  {
    appData.getActiveLots().map((item, index) => {
        item.status = false;
        basket.items = appData.getActiveLots().map((item, index) => {
            const card = new CardContainer('card',cloneTemplate(cardBasketTemplate));
            return card.render({
                title: '',
                price: null,
                index: 0,
            });
        });
    })
    page.counter = appData.getActiveLots().length;
    basket.total = appData.getTotal();
})

events.on('preview:changed', (item: LotItem) => {
    const showItem = (item: LotItem) => {
        const card = new CardPreview('card',cloneTemplate(cardPreviewTemplate), {
            onClick: () => {
                if (!item.status) {
                    events.emit('card: changes', item);
                } else {
                    events.emit('card: changeStatus', item);
                }
                events.emit('preview:changed', item)
            }
        });
        modal.render({
            content: card.render({
                category: item.category,
                title: item.title,
                image: item.image,
                price: item.price !== null ? item.price + " синапсов" : "Бесценно",
                description: item.description,
                button: item.status,
            })
        });

    };

    if (item) {
        api.getLotItem(item.id)
            .then((result) => {
                item.description = result.description;
                showItem(item);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        modal.close();
    }

});

events.on('orderEmailPhone:submit', () => {
    appData.order.total = appData.getTotal();
    api.orderLots(appData.order)
        .then((result) => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                    appData.clearOrder();
                    events.emit('basket: remove');

                }
            });

            modal.render({ 
                content: success.render({
                    sumPrice: appData.getTotal().toString(),
                })
            });
        })
        .catch(err => {
            console.error(err);
        });

});

api.getLotList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.error(err);
    });



