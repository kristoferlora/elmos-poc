# ELMOS Admin System
- React based application using redux and formik.
- Created with create-react-app

# Routes
- Login
- Dashboard
- Electric Meter
- Electric Meters
- Add Electric Meter
- Users
- Add User

# Deployment
## PM2
- install pm2 `npm install -g pm2`
- npm run build
- create an app.config.json with the contents similar to below
```json
{
  "apps": [
    {
      "name": "frontend",
      "script": "node",
      "interpreter": "none",
      "args": "serve.js"
    }
  ]
}
```
- pm2 start app.config.json
