const { execute } = require("../config/databases/queryWrapperMysql");

class CategoryService {
    async getAllCategory() {
        try {
            const query = 'SELECT * FROM categories';
            const categoriesList = await execute(query, []);
            if (categoriesList.length > 0 ) {
                return {"status": 200, "data": categoriesList, "success": true};
            } else {
                throw {"status": 204, "success": false, "message": "No categories found"};
            }
        } catch (error) {
            throw error;
        }
    }

    async addCategory(category) {
        try {
            const query = "INSERT INTO categories(name, active) VALUES (?, ?)";
            const result = await execute(query, [category.name, category.active]);
            if (result.affectedRows > 0) {
                return {"status": 201, "success": true, "message": "Category added successfully"};
            } else {
                throw {"status": 400, "success": false, "message": "Failed to add category"};
            }
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(category, id) {
        try {
            const updateQuery = "UPDATE categories SET ? WHERE id = ?";
            const result = await execute(updateQuery, [category, id]);
            if (result && result.affectedRows > 0) {
                return {"status": 200, "success": true, "message": "Category updated successfully"};
            } else {
                throw {"status": 404, "success": false, "message": "Category not found"};
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new CategoryService()