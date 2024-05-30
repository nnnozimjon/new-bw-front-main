export interface IProduct {
    discount: number,
    hideProduct: boolean,
    id: string,
    productId?: string
    imagePath: string,
    images: string[]
    isNew: boolean,
    productName?: string,
    name?: string
    price: number
    productDate: Date
    count?: number
    rating: number
}