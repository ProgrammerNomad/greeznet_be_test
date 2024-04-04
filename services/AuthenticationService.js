
const crypto = require("../common/crypto"); 
const { execute } = require("../config/databases/queryWrapperMysql");
const { v4: uuidv4 } = require('uuid');


// Now, you can use the imported modules as needed
const decryptedData = crypto.decryptedData;
const encryptedData = crypto.encryptedData;
const generateJwtToken = crypto.generateJwtToken;
const generateRandomPassword = crypto.generateRandomPassword;
const decodeToken = crypto.decodeToken

class userAuthenticationService{

    async signup(registerData) {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUserQuery = 'SELECT email FROM users WHERE email = ?';
                const isUserExist = await execute(checkUserQuery, [registerData.email]);
                if (isUserExist.length > 0) {
                    reject({ "success": false, error: 402, "message": "Try with a different email" });
                } else {
                    const payload = {
                        firstName: registerData.firstName,
                        lastName: registerData.lastName,
                        email: registerData.email,
                        password: registerData.password,
                        mobile: registerData.mobile,
                        isAdmin: registerData.isAdmin
                    };
                    const currentDate = new Date().toLocaleString(); // Format date correctly
                    
                    const cipherText = await encryptedData(registerData.password);
                    const registerQuery = "INSERT INTO users (id, first_name, last_name, email, phone, is_admin, created_at, updated_at, password)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    const insertResult = await execute(registerQuery, [
                        uuidv4(),
                        payload.firstName,
                        payload.lastName,
                        payload.email,
                        payload.mobile,
                        payload.isAdmin,
                        currentDate,
                        currentDate,
                        cipherText
                    ]);
                    if (insertResult.affectedRows > 0) {
                        resolve({ "success": true, message: "Data inserted successfully" });
                    } else {
                        reject({ "success": false, message: "No rows affected" });
                    }
                }
            } catch (error) {
                reject({ "success": false, "message": `Error occurred while signup: ${error.message}` });
            }
        });
    }
    
    
    async partnersignup(registerData) {
        return new Promise(async (resolve, reject) => {
            try {
                const checkUser = 'SELECT email FROM partners WHERE email = ?';
                const isUserExist = await execute(checkUser, [registerData.email]);
                if (isUserExist.length > 0) {
                    reject({ "success": false, error: 402, "message": "Try with a different email" });
                } else {
                    const password = generateRandomPassword()
                    const cipherText = await encryptedData(password)
                    const payload = {
                        UID_number:registerData.UID_number,
                        company:registerData.company,
                        address:registerData.address,
                        city:registerData.city,
                        country:registerData.country,
                        homepage:registerData.homepage,
                        contact_person_title:registerData.contact_person_title,
                        first_name:registerData.first_name,
                        last_name:registerData.last_name,
                        email:registerData.email,
                        number:registerData.number,
                        who_do_you_offer_services:registerData.who_do_you_offer_services,
                        category:registerData.category,
                        objects:registerData.objects,
                        areas_of_application:registerData.aoApplication,
                        payment_method:registerData.payment_method,
                        card_number:registerData.card_number,
                        expiry_date:registerData.expiry_date,
                    };
                    const id = uuidv4()
                    const registerquery = `INSERT INTO partners (id, UID_number, company, address, city, country, homepage, password, contact_person_title, first_name, last_name, email, number, who_do_you_offer_services, category, objects, areas_of_application, payment_method, card_number, expiry_date)  
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

                    const insertResult = await execute(registerquery, [
                        id, // Assuming id is an auto-incrementing primary key
                        payload.UID_number,
                        payload.company,
                        payload.address,
                        payload.city,
                        payload.country,
                        payload.homepage,
                        cipherText,
                        payload.contact_person_title,
                        payload.first_name,
                        payload.last_name,
                        payload.email,
                        payload.number,
                        payload.who_do_you_offer_services,
                        payload.category,
                        payload.objects,
                        payload.areas_of_application,
                        payload.payment_method,
                        payload.card_number,
                        payload.expiry_date
                    ]);

                    if (insertResult.affectedRows > 0) {
                        resolve({ "success": true, message: "Data inserted successfully", data: password });
                    } else {
                        reject({ "success": false, message: "No rows affected" });
                    }
                }
            } catch (e) {
                console.error("Error occurred while signing up:", e);
                reject({ "success": false, "message": `Error occurred while signup: ${e.message}` });
            }
        });
    }
    
    
    
    async login(userData) {
        try {
            const checkUser = 'SELECT id, email, password FROM users WHERE email = ?';
            const resultUser = await execute(checkUser, [userData.email]);
            if (resultUser.length > 0) {
                const decryptedPassword = await decryptedData(resultUser[0].password);
                if (decryptedPassword === userData.password) {
                    const payload = {
                        email: userData.email,
                        password: userData.password
                    };
                    const jwttoken = generateJwtToken(payload, "##$$ecomm$$##", '1hr');
                    return { "status": 201, "success": true, "data":{"token": jwttoken, "user_id":resultUser[0].id}, message: "Login successfully" };
                } else {
                    return { "status": 400, "success": false, message: "Incorrect username/password" };
                }
            } else {
                return { "status": 404, "success": false, message: "User not found" };
            }
        } catch (e) {
            console.error('Error during login:', e);
            return { "status": 500, "success": false, message: "An error occurred during login" };
        }
    }


    async partnersLogin(userData) {
        try {
            const checkUser = 'SELECT id, email, password FROM partners WHERE email = ?';
            const resultUser = await execute(checkUser, [userData.email]);
            if (resultUser.length > 0) {
                const decryptedPassword = await decryptedData(resultUser[0].password);
                if (decryptedPassword === userData.password) {
                    const payload = {
                        id:resultUser[0].id
                    };
                    const jwttoken = generateJwtToken(payload, "##$$ecomm$$##", '12hr');
                    const authTokenInsert = `INSERT INTO account_tokens ( authtoken, user_id) VALUES (?, ?);`;
                    const authResult = await execute(authTokenInsert, [ jwttoken, resultUser[0].id]);
                    if (authResult.affectedRows > 0){
                        return { "status": 201, "success": true, "data":{"token": jwttoken, "user_id":resultUser[0].id}, message: "Login successfully" };
                    }
                } else {
                    return { "status": 400, "success": false, message: "Incorrect username/password" };
                }
            } else {
                return { "status": 404, "success": false, message: "User not found" };
            }
        } catch (e) {
            console.error('Error during login:', e);
            return { "status": 500, "success": false, message: "An error occurred during login" };
        }
    }
    
    async updateUser(userUpdateData, id){
        return new Promise((resolve, reject)=>{
            try{
                const updateQuery = "update user set ? where id = ?";
                const result = execute(updateQuery, [userUpdateData, id])
                if(result[0]){
                    return resolve({"status":201,"success":true, message:"user updated successfully"})
                }else{
                    return {"status":400,"success":false, message:"user not found"}
                }
            }catch(e){
                return reject(e)
            }
        })
    }
    async getUsers(){
        return new Promise(async(resolve, reject)=>{
            const userList = "select * from users"
            const result = await execute(userList, [])
            if(result[0]){
                return resolve({"status":"200", "data":result ,"success":true})
            }else{
                return reject({"status":"204", "success":false})
            }
        })
    }

    async getAllPartners(pageNumber = 1, pageSize = 10) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const limit = pageSize;
    
            const userList = "SELECT p.*, c.name as cat_name FROM partners as p left join categories as c on c.id = p.category LIMIT ?, ?";
            const result = await execute(userList, [offset, limit]);
    
            if (result.length > 0) {
                return { "status": 200, "data": result, "success": true };
            } else {
                return { "status": 204, "success": false, "message": "No partners found" };
            }
        } catch (error) {
            console.error('Error while fetching partners:', error);
            return { "status": 500, "success": false, "message": "An error occurred while fetching partners" };
        }
    }

    async getPartnersName() {
        try {
    
            const userList = "SELECT id, first_name, last_name FROM partners";
            const result = await execute(userList, []);
    
            if (result.length > 0) {
                return { "status": 200, "data": result, "success": true };
            } else {
                return { "status": 204, "success": false, "message": "No partners found" };
            }
        } catch (error) {
            console.error('Error while fetching partners:', error);
            return { "status": 500, "success": false, "message": "An error occurred while fetching partners" };
        }
    }

    async getParticularUser(id){
        return new Promise(async(resolve, reject)=>{
            const userList = `select * from users where id = ${id}`
            const result = await execute(userList, [])
            if(result[0]){
                return resolve({"status":"200", "data":result ,"success":true})
            }else{
                return reject({"status":"204", "success":false})
            }
        })
    }

    async getParticularPartner(id){
        return new Promise(async(resolve, reject)=>{
            const userList = `select * from partners where id = ${id}`
            const result = await execute(userList, [])
            if(result[0]){
                return resolve({"status":"200", "data":result ,"success":true})
            }else{
                return reject({"status":"204", "success":false})
            }
        })
    }

    async forgotPassword(id, newPassword){
        return new Promise((resolve, reject)=>{
            try{
                cipherText = encryptedData(newPassword)
                const updateQuery = `update users set password = ? where id = ?`;
                const result = execute(updateQuery, [cipherText, id])
                if(result[0]){
                    return resolve({"status":201,"success":true, message:"user updated successfully"})
                }else{
                    return {"status":400,"success":false, message:"user not found"}
                }
            }catch(e){
                return reject(e)
            }
        })
    }
    async forgotPartnerPassword(id){
        return new Promise((resolve, reject)=>{
            try{
                let newPassword = generateRandomPassword()
                const updateQuery = `update partners set password = ? where id = ?`;
                const result = execute(updateQuery, [encryptedData(newPassword), id])
                if(result[0]){
                    return resolve({"status":201,"success":true, "password":newPassword, "message":"user updated successfully"})
                }else{
                    return {"status":400,"success":false, message:"user not found"}
                }
            }catch(e){
                return reject(e)
            }
        })
    }

    async remove(id){
        return new Promise( async(resolve, reject)=>{
            const deletesQuery = "DELETE FROM user WHERE id = ?"
            const result = await execute(deletesQuery, [id])
            if(result[0]){
                return resolve({"status":200,"success":true, "message":"user deleted successfully"})
            }else{
                return reject({"status":"204", "success":false, "message":"No such user found"})
            }

        })
    }

    async logout(token){
        return new Promise( async(resolve, reject)=>{
            if (!token) {
                return response.status(401).json({ success: false, message: "Token is missing" });
            }else{
                const userId = decodeToken(token, "##$$ecomm$$##")
                const deletesQuery = `DELETE FROM account_tokens WHERE user_id = ?;`
                const result = await execute(deletesQuery, [userId])
                if(result.affectedRows == 1){
                    return resolve({"status":200,"success":true, "message":"user deleted successfully"})
                }else{
                    return reject({"status":"204", "success":false, "message":"No such user found"})
                }
            }

        })
    }
}


module.exports = new userAuthenticationService()