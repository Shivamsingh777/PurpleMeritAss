## API
- POST /api/auth/register {email,password}
- POST /api/auth/login {email,password} → {token}
- CRUD (auth required via Bearer token):
  - /api/drivers  GET POST PATCH/:id DELETE/:id
  - /api/routes   GET POST PATCH/:id DELETE/:id
  - /api/orders   GET POST PATCH/:id DELETE/:id
- Simulation:
  - POST /api/simulations/run { numDrivers, routeStartHHMM, maxHoursPerDriver }
  - GET  /api/simulations/history
