
export interface ILotItem {
    id: string;
    title: string;
    about: string;
    description?: string;
    image: string;
}

export interface IModal {   
    content: HTMLElement;       
}

export interface IAppState { 
    catalog: ILotItem[];  
    basket: string[];  
    preview: string | null; 
    order: IOrder | null;  
}

export interface IOrderEmailPhone { 
    email: string;
    phone: string;
}

export interface IBasket { 
    items: HTMLElement[];     
    total: number;             
    button: string[];          
}

export interface IOrderWayAddress  { 
    email: string;
    phone: string;
    payment: string;
    address: string;
}

export interface IForm {  
    valid: boolean;            
    errors: string[];          
}

export interface IOrder  { 
    email: string;
    phone: string;
    payment: string;
    address: string;
    total: number;
    items: string[]
}

export interface IOrderResult { 
    id: string;
}

export interface IPage {    
    counter: number;        
    catalog: HTMLElement[];  
    locked: boolean;         
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;






