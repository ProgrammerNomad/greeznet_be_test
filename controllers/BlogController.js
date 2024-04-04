const BlogService = require("../services/BlogService")

class SubCategoryController{
    async getAllBlogs(request,response, next ){
        try{
            const result = await BlogService.getAllBlogs()
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async addCategory(request,response, next ){
        try{
            const result = await BlogService.createBlog(request.body)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async updateCategory(request,response, next ){
        try{
            const result = await BlogService.updateSubCategory(request.body, request.params.id)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
}

module.exports = new SubCategoryController()