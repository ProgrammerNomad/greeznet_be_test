const bookingService = require("../services/bookingService")


class BookingController{
    async getAllBooking(request,response, next ){
        try{
            const result = await bookingService.bookingList()
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async getByIdBooking(request,response, next ){
        try{
            const result = await bookingService.bookingById(request.params.id)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }

    async createNewBooking(request,response, next ){
        try{
            const result = await bookingService.addNewBooking(request.body)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async updateBooking(request,response, next ){
        try{
            const result = await bookingService.updateBooking()
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }
    }
    async removeBooking(request,response, next ){
        try{
            const result = await bookingService.getAllBooking(request.params.id)
            return result.success ? response.status(200).json(result):response.status(203).json(result) 
        }catch (e){
            throw e
        }finally{
            next()
        }
    }
    async updateBookingStatus(request, response, next){
        try{
            const { id, type, partnerId } = request.body;
            const result = await bookingService.updateBookingStatus(id, type, partnerId)
            return result.success ? response.status(200).json(result):response.status(203).json(result)

        }catch (e){
            throw e
        }finally{
            next()
        }
    }

    async getPartnerBooking(request, response, next){
        try{
            const id = request.params.pid
            const result = await bookingService.getPartnersBooking(id)
            return result.success ? response.status(200).json(result):response.status(203).json(result)

        }catch (e){
            throw e
        }finally{
            next()

        }
    }
}

module.exports = new BookingController()
