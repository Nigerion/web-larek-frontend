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
email:string
phone : string 
adress :string 

IBasket состоит из :
items:HTMLElement 
total : number 
selection : string[]
summPrice:number 


## Отображение  (View) придставлено ниже :

class Card extends Component
будте иметь разметку карточки 
set id : string  доьавляет id 
set image : string добавляет картинку 
set title : string добавляет заголовок 
set descripotion : string | string[] добавляет контент 

class Basket extends Component 
будте иметь разметку корзины 
set items: HTMLElement[] добавляет товар 
set selected:  string[] проверяет есть ли в корзине товар 
set total: number добавляет тотал 
set summPrice: number считает общую цену товаров
Price добавляет цену 

class Order extends Form
будте иметь разметку формы  
set phone: string добавляет телефон 
set email: string добавляет емайл 
set adress: string добавляет адресс 
set way: string добавляет способ оплаты 

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

Modal extends Component
имеет общую разметку модального окна 
имеет общие методы :
close: открывает окно 
open: закрывате окно 
render: собирает окно  

Model 
Базовая модель
emitChanges : cообщить всем что модель поменялась

## Cобытия  

//Открыть/закрыть карточку
card:selecte
// Блокируем прокрутку страницы если открыта модалка 
modal:open
//и разблокируем
modal:close
// открытие и закрытие корзины 
basket:open
// Открыть/закрыть  форму заказа
order:open
// Отправлена форма заказа
order:submit
// Изменилось состояние валидации формы
formErrors:change

## Слой представления (Presenter) представлен ниже : 

Мы будем связывать с помощью базового класса EventEmiter 
Он имеет следующие методы:
on - устанавливает обработчик события 
of - снимает обработчик события 
emit - инициировать событие с данными 
onAll - слушать все события 
offAll - сбрасывет все обработчики событий 
trigger - генерирует событие при вызове 

Что пользователь может сделать на сайте : 
1.пользователь может нажать на карточку откроется модальное окно с этой карточкой 
2.пользователь может нажать на корзину откроется модальное окно корзины ( в которой могут быть товары )
3.пользователь может закрыть карточку/карзину модальное окно закроется 
4.пользователь в корзине модет нажать на оформление откроется модальное окно с оформлением заказа 
5.пользоатель может нажать на далее откроется след. модальное окно для оформления заказа