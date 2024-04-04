const Express = require("express");
const publicRoute = Express.Router()
const userController = require("../controllers/AuthenticationController");


/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Get all users
 *     
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *          description: Not Found
 *       203:
 *          description: No Content
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               mobile:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"  # Assuming mobile number is 10 digits
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, invalid input data
 * /api/admin-login:
 *   put:
 *     summary: Admin login
 *     description: Log in an admin user with the provided email and password
 *     tags:
 *       - User
 *     requestBody:
 *       description: Admin login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: Admin@gmail.com
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string 
 *                 default: Admin@1234
 *                 format: password
 *                 example: myAdminPassword123
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, incorrect email or password
 * 
 */

publicRoute.get("/api/user", userController.getUsers);
publicRoute.put("/api/admin-login", userController.loginUser)
publicRoute.post("/api/register", userController.signupNewUser)
publicRoute.patch("/api/updateuser/:id", userController.updateExistingUser)
publicRoute.get("/api/user/:id", userController.getUser);
publicRoute.put("/api/forgot/:id", userController.forgotPassword)
publicRoute.post("/api/partner", userController.signupNewPartner)
publicRoute.get("/api/partner",userController.getAllPartners)
publicRoute.get("/api/partner-name", userController.getPartnerName)
publicRoute.put('/api/partner', userController.PartnersLogin)
publicRoute.delete('/api/logout',userController.logout)
module.exports = publicRoute