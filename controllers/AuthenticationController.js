const userService  = require('../services/AuthenticationService')

class UserAuthenticationController{
    async getUsers(request, response, next){
        try{
            const result = await userService.getUsers()
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
            console.log(e)
        }
    }
    async getAllPartners(request, response, next){
        try{
            const result = await userService.getAllPartners()
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
            console.log(e)
        }
    }

    async forgotPartnerPassword(request, response, next){
        try{
            const result = await userService.forgotPartnerPassword()
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
            console.log(e)
        } 
    }
    async signupNewUser(request, response, next){
        try{
            const registerData = request.body;
            const result = await userService.signup(registerData)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
            } catch (e) {
              // Handle unexpected errors
              console.error(e);
              return response.status(500).json({ success: false, error: 500, message: "Internal server error" });
            }
        }catch (e){
           return e
    }
    async signupNewPartner(request, response, next){
        try{
            const registerData = request.body;
            const result = await userService.partnersignup(registerData)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
            } catch (e) {
              // Handle unexpected errors
              console.error(e);
              return response.status(500).json({ success: false, error: 500, message: "Internal server error" });
            }finally {
                next(); 
            }
        }
    async loginUser(request,response, next){
        try {
            const loginData = request.body;
            const result = await userService.login(loginData)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            console.log(error);
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async PartnersLogin(request, response,next){
        try {
            const result = await userService.partnersLogin(request.body)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            console.log(error);
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }
    async updateExistingUser(request, response, next){
        try {
            const updateData = request.body;
            const result = await userService.updateUser(updateData)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            console.log(error);
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async deleteUser(request, response, next){
        try{
            const userid = request.params.id
            const result = await userService.remove(userid)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        } catch (error) {
            response.status(500).json({ success: false, error: 500, message: "Internal server error" });
        }finally {
            next(); 
        }
    }
    async getUser(request, response, next){
        try{
            const userid = request.params.id
            const result = await userService.getParticularUser(userid)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
           return response.status(500).json({ success: false, error: e, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async getPartnerName(request, response, next){
        try{
            const userid = request.params.id
            const result = await userService.getPartnersName()
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
           return response.status(500).json({ success: false, error: e, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async forgotPassword(request, response, next){
        try{
            const userid = request.params.id
            const result = await userService.forgotPassword(userid, newPassword)
            return result.success ? response.status(200).json(result):response.status(203).json(result)
        }catch (e){
           return response.status(500).json({ success: false, error: e, message: "Internal server error" });
        }finally {
            next(); 
        }
    }

    async logout(request, response, next) {
        try {
            const token = request.headers.authorization;
            const result = await userService.logout(token);
            return result.success ? response.status(200).json(result) : response.status(203).json(result);
        } catch (e) {
            return response.status(500).json({ success: false, error: e });
        } finally {
            next(); 
        }
    }
    
}

module.exports = new UserAuthenticationController()

