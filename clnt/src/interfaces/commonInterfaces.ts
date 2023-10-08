export interface UserAuthData{
    user_id:string
    name:string
    email:string
    phone:string
    isAdmin?:boolean
}

export interface IProduct{
    _id:string,
    productname:string
    image:string
    description:string
    price:number
    category_name?:string
    enum?:string
}
