export interface IProduct {
    discount: number,
    hideProduct: boolean,
    id: string,
    imagePath: string,
    images?: string
    isNew: boolean,
    productName?: string,
    name?: string
    price: number
    productDate: Date
    rating: number
}