import { Router } from "express";
import {
  ProductGetApi,
  productAddApi,
  addCategoryApi,
  getAllCategory,
  searchProduct
} from "./controller";

const userRouter = Router();

userRouter.post("/add-category", addCategoryApi);
userRouter.get("/get-all-category", getAllCategory);
userRouter.get("/search-products", searchProduct);
// adminRouter.get("/get-all-user",getUsersData);
userRouter.post("/add-product", productAddApi);
userRouter.get("/get-all-product", ProductGetApi);
// adminRouter.delete("/delete-product/:id", ProductDeleteApi);
// adminRouter.delete("/delete-user/:id",UserDeleteApi);
// adminRouter.put("/update-enums/:id", ProductDispatchToUser);
// adminRouter.put("/undo-product/:id", undoProductAction);
// adminRouter.get("/get-payment-details",paymentDetails);

export default userRouter;
