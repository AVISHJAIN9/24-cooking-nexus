//This file ties your Middleware (The Guard), Validator (The Shield), and Controller (The Orchestrator) into a single secure line of code.
const express = require('express');
const routes = express('routes');

const logincontroller = require('./core/001-Auth-User-Login.controller');
const loginvalidator = require('./core/001-Auth-User-Login.validator');
const loginratelimiter = require('./core/001-Auth-User-Login.middleware');


routes.post(
    '/login',
    loginratelimiter, // Guard against brute-force attacks
    loginvalidator.loginValidator, // Validate and sanitize inputs
    logincontroller // Handle the login logic
);

module.exports = Router;
