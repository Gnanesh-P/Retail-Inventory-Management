export class Product {
    id: string
    name: string;
    barCode: string;
    sku: string;
    barcode: string;
    perUnitPrice: number
    images: string;
    brand: Brand
    category: Category;
    pieceCount: number
    tax: Tax
    createdTime: Date
    modifiedTime?: Date
}

export class Brand {
    id?: string
    name: string
}

export class Category {
    id?: string
    name: string
}

export class Tax {
    type: string
    percentage: number
}

export class Warehouse {
    id?: string
    name: string
    address: string
}