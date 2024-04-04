const SubCategoryService = require('../services/SubCategoryService')

class SubCategoryController{
    async getAllCategory(request,response, next ){
        try{
            const result = await SubCategoryService.getAllSubCategories()
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async addCategory(request,response, next ){
        try{
            const result = await SubCategoryService.createSubCategory(request.body)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async updateCategory(request,response, next ){
        try{
            const result = await SubCategoryService.updateSubCategory(request.body, request.params.id)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
}

module.exports = new SubCategoryController()