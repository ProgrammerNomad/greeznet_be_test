const { execute } = require("../config/databases/queryWrapperMysql");

class BlogService {
    async getAllBlogs() {
        try {
            const blogsquery = 'SELECT * FROM blogs';
            const result = await execute(blogsquery, []);
            if (result.length > 0) {
                return {"status": 200, "data": result, "success": true};
            } else {
                return {"status": 204, "success": false, "message": "No blog found"};
            }
        } catch (error) {
            throw error;
        }
    }

    async getByIdBlogs(id) {
        try {
            const blogsquery = 'SELECT * FROM blogs where id=?';
            const result = await execute(blogsquery, [id]);
            if (result.length > 0) {
                return {"status": 200, "data": result, "success": true};
            } else {
                return {"status": 204, "success": false, "message": "No blog found"};
            }
        } catch (error) {
            throw error;
        }
    }

    async createBlog(blogsData) {
        try {
            const currentData = new Date()
            const createBlogsQuery = 'INSERT INTO blogs (name, is_active) VALUES (?, ?)';
            const result = await execute(createBlogsQuery, [blogsData.title,blogsData.description, blogsData.image,currentData, currentData, blogsData.active]);
            if (result.affectedRows > 0) {
                return {"status": 201, "success": true, "message": "Subcategory created successfully"};
            } else {
                throw {"status": 400, "success": false, "message": "Failed to create subcategory"};
            }
        } catch (error) {
            throw error;
        }
    }

    async updateBlog(blogsData, id) {
        try {
            const updateBlogQuery = "UPDATE blogs SET ? WHERE id = ?";
            const result = await execute(updateBlogQuery, [blogsData, id]);
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

module.exports = new BlogService();
