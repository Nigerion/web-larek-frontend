# Проектная работа "Веб-ларек"

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
