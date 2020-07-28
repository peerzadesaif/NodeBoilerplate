# NodeBoilerplate

> A boilerplate for **Node.js** backend applications.

## Build Setup

Getting Started
---------------

The easiest way to get started is to clone the repository:

``` bash
# Get the latest snapshot
git clone https://github.com/saifpirjade/NodeBoilerplate.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply serve your backend at localhost:8001
npm run dev

# Use PM2 to run the server on production
npm run server

```
Features
--------
- **Middleware to verify client Authentication token**
- **Middleware to Set API version** checking client request and passing API version into the request-response
- MVC Project Structure
- Winston logger service to handle logs based on conditions
- Error service to handle all type of error
- Process error handled with required possibilities
- Security Service to generate JWT, verify JWT, decode JWT, encrypt token, decrypt token, and etc
- Response Service to handle all types of responses and status code using the same.
- Created cluster module to run the server with clustering
- Added redis and redis store to manage your express sessions

Notes
---------------
- Please start redis server on your system
- Reference link for redis : https://redis.io/topics/quickstart
