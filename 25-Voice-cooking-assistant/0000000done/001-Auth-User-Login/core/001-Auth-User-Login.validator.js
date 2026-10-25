//This uses the "DRY" factory logic you created to sanitize inputs before they touch the database.

const { body, validationResult } = require('express-validator'); // dry code 
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    return res.status(422).json({
        errors: errors.array().map(err => ({ [err.path]: err.msg }))
    });
};
const loginRules = () => { // encapsulation and initilization dont just create rules  we creste a foctory for those rules 
    return [
        body('email').isEmail().withMessage('Enter a valid chef email').normalizeEmail(),
        body('password').isLength({ min: 8 }).withMessage('Password must be 8+ chars'),
    ];
};
module.exports = {
    loginValidator: [loginRules(), validate]
};
// //Request Flow and Connection/////
// The typical flow for handling a request follows this sequence:
// Middleware
// Role: The request first passes through a series of middleware functions. Middleware can handle a variety of cross-cutting concerns such as logging, authentication, authorization, and data parsing (e.g., express.json() to parse the request body).
// Connection: Middleware functions are executed in order. Each function can modify the request or response objects and is responsible for calling next() to pass control to the next function in the pipeline. If validation fails, the middleware can return an error response immediately, "short-circuiting" the pipeline and preventing invalid data from reaching subsequent layers.
// Mastering Middleware-Based Input Validation in Node.js and ...
// Build a Custom Payload Validation Middleware for ExpressJS ...
// In what layer does request validation go in a Node REST API ...
// View all
// Validator
// Role: Validation is typically implemented as a specialized type of middleware (e.g., using libraries like express-validator). It ensures that the incoming data meets specific requirements before processing the request further.
// Connection: The validator middleware runs before the controller. If validation errors are found, it captures them and typically sends a 4xx HTTP response (e.g., 422 Unprocessable Entity) without ever reaching the controller or service layers. This keeps the controller and service layers clean and focused on core business logic, as they can assume the data they receive is valid.
// Controller
// Role: The controller's primary role is to handle the HTTP-specific request (routing) and delegate the necessary work to the service layer. It acts as the entry point for specific endpoints.
// Connection: After all middleware (including validation) has passed, the request reaches the appropriate controller function. The controller uses the service layer to perform business operations and ultimately prepares the HTTP response (e.g., JSON object, rendered page).
// Service
// Role: Services encapsulate the core business logic, domain models, and interactions with data access layers (like repositories or databases).
// Connection: The controller calls methods in the service layer to execute specific tasks. Services might use validators internally for business logic checks that go beyond basic input validation (e.g., checking data existence in a database). The service returns data or a status back to the controller, which then sends the final response to the client. 
// Reddit
// Red
// ////