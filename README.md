# Интенрнет-магазин
# О проекте
Наш интернет-магазин Web-ларёк предлагает товары для веб-разработчиков. Здесь вы можете просмотреть каталог товаров, добавить их в корзину и оформить заказ. В проекте используется архитектура MVP. Мы получаем с сервера массив объектов cardList и объект cardItem.
![image](https://github.com/Nigerion/web-larek-frontend/assets/115921794/9266ed6c-29c0-436c-9a21-c482d8318b00)
# Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
# Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами
# Технологии
HTML, SCSS, TS, Webpack
# Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Что было сделано
 Слой данных (Model) представлен ниже:  <br> 
  
ICard соситоит из: <br>
- `id`- имеет тип string<br>
- `title`- имеет тип string <br>
- `image` - имеет типstring<br>
- `category` - имеет тип string <br>
- `price` - имеет тип number| null <br>
- `discription` - имеет тип string <br>

IOrder состоит из: <br>
- `email`- имеет тип string;<br>
- `phone`- имеет тип string;<br>
- `payment`- имеет тип string;<br>
- `address`- имеет тип string;<br>
- `total`- имеет тип number;<br>
- `items`- имеет тип string[]<br>

IBasket состоит из :<br>
- `items`- имеет тип HTMLElement[];   <br>  
- `total`- имеет тип number;          <br>   
- `button`- имеет тип string[];<br>

class OrderEmailPhone<br>
- `protected onInputChange` - используется для добавления элемента в массив <br>

class OrderWayAddress<br>
- `protected onInputChange` - используется для добавления элемента в массив  <br>

class AuctionAPI<br>
- `getLotItem` - используется для получение информации о товаре<br>
- `getLotList` - используется для оформления заказа<br>
- `orderLots` - используется для получение списка товаров<br>

class AppState<br>
- `getTotal`- используется для расчета общей сумму заказа<br>
- `setCatalog` - используется для установки списока товара <br>
- `setPreview`- используется для устанавки изображения<br>
- `getActiveLots`- используется для получения выбранных товаров<br>
- `getBasket`-используется для порлучения корзины<br>
- `setOrderField`- используется для добавляения поля <br>
- `removeOrder`- используется для того ,чтобы убрать из заказа <br>
- `addingInOrder`- используется для добавления в заказ<br>
- `validateOrderWayAddress`-  используется для валидации поля в форме<br>
- `validateOrderEmailPhone`-  используется для валидациит поля в форме<br>
- `clearOrder`- очищает корзину <br>

 Отображение  (View) придставлено ниже :<br>

class Order extends Form<br>
будте иметь разметку формы  <br>
- `set phone` - имеет тип string, используется для добавления телефона <br>
- `set email`- имеет тип string, используется для добавления емайла <br>
- `set adress` - имеет тип string, используется для добавления адресса <br>
- `set way` - имеет тип string, используется для добавления способа оплаты <br>

class CardPreview<br>
- `set/get category` - используется для устанавлки и возращения категории<br>
- `set image` - используется для устанавки изображения<br>

class Page<br>
- `counter`- используется для обновления счетчика<br>
- `catalog`- используется для обновления каталога<br>
- `locked`- используется для блокировки прокрутки<br>

сlass CardContainer<br>
- `set index` - используется для устанавки порядкового номера товара <br>

class Success <br>
- `sumPrice`- используется для того чтбы вставить общую сумму оплаченного заказа<br>

class Basket<br>
- `set items` - используется для добавления карточки в корзине <br>
- `set selected`- используется для изменения disabled кнопки<br>
- `set total` - используется при помощи функции formatNumber число(общую сумму заказа) и вставляет в контейнер<br>
Базовый код <br>

class Component<T><br>
- `togleClass (element: HTMLElement, className: string, force?: boolean)` - используется для переключения класса<br>
- `setText (element: HTMLElement, value: unknown)` используется для становки текстового содержимого<br>
- `setDisabled (element: HTMLElement, state: boolean)` используется для смены статуса блокировки<br>
- `setHidden (element: HTMLElement)` используется для скрытия <br>
- `setVisible (element: HTMLElement)` используется для показателя<br>
- `setImage (element: HTMLImageElement, src: string, alt?: string)`- используется для установки изображения с алтернативным текстом<br>
- `render (data?: Partial<T>)` : HTMLElement - используется для возврата корневого DOM-элемента<br>

class Form<T> extends Component<br>
- `onInputChange(field: keyof T, value: string)` - используется для инициирования события с данными<br>
- `set valid`- имеет тип boolean, используется для изменения disabled кнопки  <br>
- `set errors`- имеет тип string, используется для устанавки ошибки<br>
- `render` - используется для возврата корневого DOM-элемента <br>
<br>
class Modal extends Component<br>
имеет общую разметку модального окна <br>
имеет общие методы :<br>

- `close` - используется для открытия окна <br>
- `open`- используется для закрытия окна <br>
- `render`- используется для сбора окна  <br>

class Model <br>
Базовая модель<br>
- `emitChanges` -используется длятого, чтобы cообщить всем что модель поменялась<br>

class Card<br>
- `getPrice` :<br>
- `set/get id` - используется для установки и получения значеня id<br>
- `set/get title` - используется для установки и получения значеня title<br>
- `set/get price` - используется для установки и получения значеня price<br>
- `button ` - используется для изменения содержимого кнопки <br>

Cобытия  <br>

- `card:changed`<br>
- `card:select`<br>
- `modal:open` - данное событие блокирует прокрутку страницы<br>
- `modal:close`- данное событие разблокирует прокрутку страницы<br>
- `basket:open`- данное событие при открытие корзины<br>
- `orderWayAddress:change`- данное событие при проверки ошибок<br>
- `orderEmailPhone:change`- данное событие при изменение полей<br>
- `orderWayAddress:submit`- данное событие при открытие формы<br>
- `orderEmailPhone:open`- данное событие при открытие формы<br>
- `orderWayAddress:open`- данное событие при открытие формы<br>
- `orderEmailPhonee:change`- данное событие при проверке ошибок<br>
- `card: changes`- данное событие при изменение статуса<br>
- `basket: render`- данное событие при отрисовывание корзины<br>
- `card: changeStatus`- данное событие для изменения статуса)<br>
- `basket: remove`- данное событие при очистке корзины<br>
- `preview:changed`- данное событие при изменение выбранный лотов<br>
- `orderEmailPhone:submit`- данное событие при отправление заказа<br>

Слой представления (Presenter) представлен ниже : <br>

Мы будем связывать с помощью базового класса EventEmiter <br>
Он имеет следующие методы:<br>
- `on` - используется для устанавки обработчика события <br>
- `of` - используется для снятия обработчика события <br>
- `emit` - используется для того ,чтобы инициировать событие с данными <br>
- `onAll` - используется для прослушивания всего события <br>
- `offAll` - используется для сбрасывания всеч обработчиков событий <br>
- `trigger` - используется для генерациит события при вызове <br>
# Доступные скрипты<br>
`npm build`<br>
`npm build:dev`<br>
`npm build:prod`<br>
`npm watch`<br>
`npm start`<br>
`npm lint`<br>
`npm lint:fix`<br>
`npm format`<br>
`npm deploy`<br>

# Ссылка на макет и GitHub
[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](<[https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design](https://www.figma.com/design/50YEgxY8IYDYj7UQu7yChb/Веб-ларёк?node-id=0-1&t=mYtoCS6WspfIqTai-0)>) <br>
GitHub<br>
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nigerion/mesto-project-ff)<br>
<!--

https://www.figma.com/design/50YEgxY8IYDYj7UQu7yChb/Веб-ларёк?node-id=0-1&t=mYtoCS6WspfIqTai-0





Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
В данной работе используется MVP-архитектура . С сервера к нам приходят массив объектов(cardList) и объеукт (cardItem)

## Слой данных (Model) представлен ниже:  
  
ICard соситоит из: 
id:string
title : string 
image :string
category : string 
price : number| null 
discription:string 

IOrder состоит из: 
email: string;
phone: string;
payment: string;
address: string;
total: number;
items: string[]

IBasket состоит из :
items: HTMLElement[];     
total: number;             
button: string[];

class OrderEmailPhone
protected onInputChange: добавляет в массив 

class OrderWayAddress
protected onInputChange: добавляет в массив 

class AuctionAPI
getLotItem:получение информации о товаре
getLotList:оформление заказа
orderLots:получение списка товаров

class AppState
getTotal: считает общую сумму заказа
setCatalog : устанавливает список товара 
setPreview: устанавливает изображение
getActiveLots:получение выбранных товаров
getBasket:дает корзину
setOrderField:добавляет поле 
removeOrder:убирает из заказа 
addingInOrder:Добавляет в заказ
validateOrderWayAddress: валидирует поля в форме
validateOrderEmailPhone: валидирует поля в форме
clearOrder:очищает корзину 
## Отображение  (View) придставлено ниже :

class Order extends Form
будте иметь разметку формы  
set phone: string добавляет телефон 
set email: string добавляет емайл 
set adress: string добавляет адресс 
set way: string добавляет способ оплаты 

class CardPreview
set/get category : устанавливает и возращает категорию
set image Ж устанавливает изображение

class Page
counter:обновляет счетчик
catalog:обновляет каталог
locked:блокирует прокрутку

сlass CardContainer
set index : устанавливает порядковый номер товара 

class Success 
sumPrice: всталяет общую сумму оплаченного заказа

class Basket
set items : добавляет карточки в корзине 
set selected:меняте disabled кнопки
set total : при помощи ф-ии formatNumber число(общую сумму заказа) и вставляет в контейнер
## Базовый код 

class Component<T>
togleClass (element: HTMLElement, className: string, force?: boolean) -  Переключить класс
setText (element: HTMLElement, value: unknown) - Установить текстовое содержимое
setDisabled (element: HTMLElement, state: boolean) - Сменить статус блокировки
setHidden (element: HTMLElement) - Скрыть
setVisible (element: HTMLElement) Показать
setImage (element: HTMLImageElement, src: string, alt?: string) Установить изображение с алтернативным текстом
render (data?: Partial<T>): HTMLElement - Вернуть корневой DOM-элемент

class Form<T> extends Component
onInputChange(field: keyof T, value: string) Инициировать событие с данными
set valid : boolean - меняет disabled кнопки  
set errors : string - устанавливает ошибку
render - Вернуть корневой DOM-элемент 

class Modal extends Component
имеет общую разметку модального окна 
имеет общие методы :
close: открывает окно 
open: закрывате окно 
render: собирает окно  

class Model 
Базовая модель
emitChanges : cообщить всем что модель поменялась

class Card
getPrice :
set/get id : установки и получения значеня id
set/get title : установки и получения значеня title
set/get price : установки и получения значеня price
button : меняет содержинов кнопки 

## Cобытия  

card:changed
card:select
modal:open(блокирует прокрутку страницы)
modal:close(разблокирует прокрутку страницы)
basket:open(открытие корзины)
orderWayAddress:change(проверка ошибок)
orderEmailPhone:change(изменение полей)
orderWayAddress:submit(открытие формы)
orderEmailPhone:open(открытие формы)
orderWayAddress:open(открытие формы)
orderEmailPhonee:change(проверка ошибок)
card: changes(изменение стьаутса)
basket: render(отрисовывает корзину)
card: changeStatus(для изменения статуса)
basket: remove(очистить корзину)
preview:changed(bзменен выбранный лот)
orderEmailPhone:submit(отправление заказа)

## Слой представления (Presenter) представлен ниже : 

Мы будем связывать с помощью базового класса EventEmiter 
Он имеет следующие методы:
on - устанавливает обработчик события 
of - снимает обработчик события 
emit - инициировать событие с данными 
onAll - слушать все события 
offAll - сбрасывет все обработчики событий 
trigger - генерирует событие при вызове 


-->



