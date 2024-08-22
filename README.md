# Vendor Management System Backend

## Overview

The Vendor Management System (VMS) backend is developed using Node.js. It manages vendor profiles, tracks purchase orders, and calculates vendor performance metrics. The backend also integrates Swagger UI for API documentation and testing.

## Features

1. **Vendor Profile Management**
   - Create, retrieve, update, and delete vendor profiles.
   - Fields include name, contact details, address, and a unique vendor code.

2. **Purchase Order Tracking**
   - Create, retrieve, update, and delete purchase orders.
   - Track purchase orders with fields like PO number, vendor reference, order date, items, quantity, and status.

3. **Vendor Performance Evaluation**
   - Metrics include On-Time Delivery Rate, Quality Rating Average, Average Response Time, and Fulfillment Rate.
   - Performance metrics are automatically calculated and updated based on purchase orders.


## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lokeshpandey1407/vendor-management.git

2. **Navigate to directory:**
    cd vendor-management
3. **Install the dependencies and other configurations:**
    npm install

4. **Run the project:**
    npm start
    
# Swagger API Documentation

This API uses Swagger to provide interactive documentation and testing capabilities. Below are instructions on how to use Swagger to explore and test the API.

## Accessing Swagger

To access Swagger, navigate to the following URL in your web browser:
`http://localhost:3001/api-doc`
or use the hosted link -
`https://vendor-management-3v9i.onrender.com/api-doc`

## Using Swagger

### Browsing API Endpoints

* Click on an endpoint to view its details, including the HTTP method, path, and request/response bodies.
* Use the "Try it out" button to send a request to the endpoint and view the response.

### Authentication

* The API requires authentication, you will need to provide auth token in the "Authorize" button at the top right of the page.
* Signup with name, email and password.
* Signin with the registered email and password to get the auth token.
* Enter your auth token and click "Authorize" to authenticate your requests.


