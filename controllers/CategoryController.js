const CategoryService = require('../services/CategoryService')

class CategoryController{
    async getAllCategory(request,response, next ){
        try{
            const result = await CategoryService.getAllCategory()
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async addCategory(request,response, next ){
        try{
            const result = await CategoryService.addCategory(request.body)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async updateCategory(request,response, next ){
        try{
            const result = await CategoryService.updateCategory(request.body, request.params.id)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
}

module.exports = new CategoryController()