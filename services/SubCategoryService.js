const { execute } = require("../config/databases/queryWrapperMysql");

class SubCategoryService {
    async getAllSubCategories() {
        try {
            const subCategoriesQuery = 'SELECT * FROM sub_category';
            const result = await execute(subCategoriesQuery, []);
            if (result.length > 0) {
                return {"status": 200, "data": result, "success": true};
            } else {
                return {"status": 204, "success": false, "message": "No subcategories found"};
            }
        } catch (error) {
            throw error;
        }
    }

    async createSubCategory(subCategoryData) {
        try {
            const createSubCategoryQuery = 'INSERT INTO sub_category (name, is_active) VALUES (?, ?)';
            const result = await execute(createSubCategoryQuery, [subCategoryData.name, subCategoryData.active]);
            if (result.affectedRows > 0) {
                return {"status": 201, "success": true, "message": "Subcategory created successfully"};
            } else {
                throw {"status": 400, "success": false, "message": "Failed to create subcategory"};
            }
        } catch (error) {
            throw error;
        }
    }

    async updateSubCategory(subCategoryData, id) {
        try {
            const updateSubCategoryQuery = "UPDATE sub_category SET ? WHERE id = ?";
            const result = await execute(updateSubCategoryQuery, [subCategoryData, id]);
            if (result && result.affectedRows > 0) {
                return {"status": 200, "success": true, "message": "Subcategory updated successfully"};
            } else {
                throw {"status": 404, "success": false, "message": "Subcategory not found"};
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new SubCategoryService();
