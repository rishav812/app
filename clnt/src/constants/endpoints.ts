export const endpoints={
    auth:{
       SIGNIN:"/auth/login",
       SIGNUP:"/auth/signup",
       CHANGE_PASSWORD:"/auth/password_change",
       FORGOT_PASSWORD:"/auth/forgot_password",
       VERIFY_OTP:"/auth/verify_otp",
       RESET_PASSWORD:"/auth/reset_password",
    },
    user:{
        ADDPRODUCT:"/user/add-product",
        GETALLPRODUCTS:"/user/get-all-product",
        ADD_CATEGORY:"/user/add-category",
        GET_CATEGORY:"/user/get-all-category",
        SEARCH_PRODUCTS:"/user/search-products",
        // PAGINATED_DATA:"user/paginated-products"
    }
}
