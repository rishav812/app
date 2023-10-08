import Product from "./models/productModel";
import Category from "./models/CategoryModel";
import mongoose from "mongoose";
import { IAddCategory, IAddProduct } from "./interface";

export class AuthServices {
  static addProduct = async (body: IAddProduct) => {
    const { productname, price, description, image, category_id } = body;
    try {
      if (productname && price && description && image && category_id) {
        const new_id = new mongoose.Types.ObjectId(category_id);
        const data = new Product({
          ...body,
          category_id: new_id,
        });
        await data.save();
        return {
          status: 200,
          message: "Product added successfully",
        };
      } else {
        return {
          status: 401,
          message: "bad request"
        }
      }
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  };

  static getAllProduct = async (currentPage: any, limit: any) => {
    try {
      const products = await Product.find()
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .exec();
      const totalProducts = await Product.countDocuments();
      if (products.length !== 0) {
        return {
          productData: products,
          totalItems: totalProducts,
          status: 200,
          message: "successfully fetch the products from database",
        };
      } else {
        return {
          status: 404,
          message: "product is not added by admin",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  static addCategory = async (body: IAddCategory) => {
    const { category_name } = body;
    try {
      const categoryExist_mongo = await Category.findOne({
        category_name: category_name,
      });
      console.log(category_name, "----")

      if (!categoryExist_mongo) {
        const data = new Category({
          ...body,
        });
        await data.save();

        return {
          status: 200,
          message: "Category added successfully",
        };
      } else {
        return {
          status: 400,
          message: "Category already exist",
        };
      }
    } catch (error: any) {
      console.log(error);
      return {
        status: error.status || 500,
        message: error.message || "internal server error",
      };
    }
  };

  static getAllCategoryService = async () => {
    try {
      const category = await Category.find({});
      if (category.length !== 0) {
        return {
          data: category,
          status: 200,
          message: "category retrieved successfully by mongodb",
        };
      } else {
        return {
          status: 400,
          message: "please add category",
        };
      }
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  };

  static searchProductService = async (data: any) => {
    try {
      const filter = {
        productname: {
          $regex: new RegExp(data, "i"),
        }
      };
      const result = await Product.find(filter);
      console.log("searchdata", result);
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  };
}
