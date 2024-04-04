const Express = require("express");
const privateRoute = Express.Router()
const bookingController = require("../controllers/bookingController");
const CategoryController = require("../controllers/CategoryController");
const SubCategoryController = require("../controllers/SubCategoryController");
const upload = require("../common/storeImage");

privateRoute.get('/api/bookings',bookingController.getAllBooking)
privateRoute.get('/api/bookings/:id',bookingController.getByIdBooking)
privateRoute.post('/api/bookings',upload.single("picture"), bookingController.createNewBooking)
privateRoute.patch('/api/bookings/:id', upload.single("picture"),bookingController.updateBooking)
privateRoute.put("/api/bookings", bookingController.updateBookingStatus)
privateRoute.get("/api/partner-booking/:pid", bookingController.getPartnerBooking)
// privateRoute.delete('/api/bookings/:id')
privateRoute.get('/api/category', CategoryController.getAllCategory)
privateRoute.post('/api/category', CategoryController.addCategory)
privateRoute.patch('/api/category/:id', CategoryController.updateCategory)
privateRoute.get('/api/sub-category', SubCategoryController.getAllCategory)
privateRoute.post('/api/sub-category', SubCategoryController.addCategory)
// privateRoute.patch('/api/sub-category/:id', SubCategoryController.updateCategory)


module.exports = privateRoute