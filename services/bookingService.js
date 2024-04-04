const { execute } = require("../config/databases/queryWrapperMysql");
const { v4: uuidv4 } = require('uuid');

class BookingService{
    async bookingList(pageNumber = 1, pageSize = 10){
        try{
            const offset = (pageNumber - 1) * pageSize;
            const limit = pageSize;
            const bookingList = 'SELECT b.*, sc.name as sub_cat FROM booking as b left join sub_category as sc on b.sub_category = sc.id LIMIT ?, ?';
            const result = await execute(bookingList,[offset, limit])
            if (result.length>0){
                return {"status":"200", "data":result ,"success":true}
            }else{
                return {"status":"204", "success":false}
            }
        }catch (e){
            throw e
        }
    }

    async bookingById(id){
        try{    
            const bookingList = 'SELECT * FROM booking where id  = ?';
            const bookingData = await execute(bookingList,[id])
            console.table(bookingData)
            if (bookingData.length > 0){
                return {"status":"200", "data":bookingData ,"success":true}
            }else{
                return {"status":"204", "success":false}
            }
        }catch (e){
            throw e
        }
    }

    async addNewBooking(registerData){
        try{
            const payload = {
                category: registerData.category,
                sub_category: registerData.sub_category,
                date: registerData.date,
                time_flexibility: registerData.time_flexibility,
                address: registerData.address,
                rooms: registerData.rooms,
                important: registerData.important,
                pollution_level: registerData.pollution_level,
                floor_area: registerData.floor_area,
                clean_needs: registerData.clean_needs,
                additional_areas: registerData.additional_areas,
                description: registerData.description,
                picture: registerData.picture,
                first_name: registerData.first_name,
                last_name: registerData.last_name,
                email: registerData.email
            };
            const query = 'INSERT INTO booking(id, category, sub_category,date, time_flexibility, address, important,pollution_level,floor_area,clean_needs,additional_areas,description,picture,first_name,last_name,email)values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const result = await execute(query,[
                uuidv4(),
                payload.category,
                payload.sub_category,
                payload.date,
                payload.time_flexibility,
                payload.address,
                payload.important,
                payload.pollution_level,
                payload.floor_area,
                payload.clean_needs,
                payload.additional_areas,
                payload.description,
                payload.picture,
                payload.first_name,
                payload.last_name,
                payload.email
            ])
            if (result.affectedRows > 0){
                return ({"status":"200", "data":result ,"success":true})
            }else{
                return ({"status":"204", "success":false})
            }
        }catch (e){
            throw e
        }
    }

    async updateBooking(updateBooking, id){
        try{
            const payload = {
                category: updateBooking.category,
                sub_category: updateBooking.sub_category,
                date: updateBooking.date,
                time_flexibility: updateBooking.time_flexibility,
                address: updateBooking.address,
                important: updateBooking.important,
                pollution_level: updateBooking.pollution_level,
                floor_area: updateBooking.floor_area,
                clean_needs: updateBooking.clean_needs,
                additional_areas: updateBooking.additional_areas,
                description: updateBooking.description,
                picture: updateBooking.picture,
                first_name: updateBooking.first_name,
                last_name: updateBooking.last_name,
                email: updateBooking.email
            };
            const query = 'update booking set ? where id = ?'
            const result = await execute(query,[payload, id])
            if (result.affectedRows > 0){
                return ({"status":"200", "data":result ,"success":true})
            }else{
                return ({"status":"204", "success":false})
            }
        }catch (e){
            throw e
        }
    }
    async updateBookingStatus(id, type, partnerId){
        let typeText="";
        let query = ""
        console.log(id, type, partnerId)
        const date = new Date()
        if (type === 1){
            typeText = "Assigned"
            query = 'UPDATE booking set booking_status = ?, assigned_date= ? , partner_id = ? where id = ?'
        }else if(type === 2){
            typeText = "Confirmed"
            query = 'UPDATE booking set booking_status = ?, confirmation_date=?, partner_id = ? where id = ?'
        }else if(type === 3){
            typeText = "Completed"
            query = 'UPDATE booking set booking_status = ?, completion_date=?, partner_id = ? where id = ?'
        }else if(type === 4){
            typeText = "Cancelled"
            query = 'UPDATE booking set booking_status = ?, cancelation_date=?, partner_id = ? where id = ?'
        }
        const result = await execute(query,[typeText, date, partnerId, id])
        if (result.affectedRows > 0){
            return ({"status":"200", "data":result ,"success":true})
        }else{
            return ({"status":"204", "success":false})
        }
    }

    async getPartnersBooking(id, pageNumber = 1, pageSize = 10){
        try{
            const offset = (pageNumber - 1) * pageSize;
            const limit = pageSize;
            const query = 'select * from booking where partner_id = ? LIMIT ?, ?;'
            const result = await execute(query, [id, offset, limit])
            console.table(result)
            if (result.length > 0){
                return ({"status":"200", "data":result ,"success":true})
            }else{
                return ({"status":"204", "success":false})
            }
        }catch (e){
            throw e
        }
    }
}


module.exports = new BookingService()