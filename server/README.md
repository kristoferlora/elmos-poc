# ELMOS backend
- A backend ExpressJS server built with sequelize as the ORM and postgresql as the database

## IOT routes
- /api/iot-update

### IOT-Update
- Used for IOT devices to connect and update user bill

## Deployment
### PM2 deployment
- install pm2 `npm install -g pm2`
- npm run build
- pm2 start dist/app.js
