## Project under construction... 🛠️

## Description
This project was used for studies of the following topics: 
- Nestjs Monorepo
- Yarn workspace for monorepo
- Docker and docker composer for monorepo 
- Redis Database
- Microservice async communication with pub/sub
- Pub/sub with NestJs and redis
- Prisma ORM
- Prisma ORM with monorepo

## Get Started
This project contains docker compose with off configuration. 
To run project: 
- copy content file `.env.example` to `.env` 
- run command `docker-compose up` 

## Tecnical Description
This project was created with the Nestjs monorepo standard, and was separated into services that communicates with Async Pub/subs using Redis.


## Services
- order-service: Service for orders
- billing-service: Service for billing order
- shipping-service: Service for shipping order

### <b>Order Service</b>
Contains http request and communications pub/sub

<b>Http Requests:</b>

- [POST] `/orders` - Create order\
  Body Example:
  ```json
  {
    "userId": 1,
    "products": [
      {
        "name": "Mouse Gamer",
        "price": 10
      }, 
      {
        "name": "Teclado Gamer",
        "price": 5
      }
    ]
  }
  ```

- [GET] `/orders` - List two lasts orders
- [GET] `/orders/:id` - Get One Order
- [GET] `/clean` - Delete all orders


## Flow de pub/sub
1. Request POST `/orders` to create order
2. [Order Service] emit event `OrderService:newOrder`
3. [Billing Service] listen `OrderService:newOrder`
4. [Billing Service] run random True or False
5. [Billing Service] emit `BillingService:billing` with random result and status date
6. [Order Service] listen `BillingService:billing` and include status in order
7. [Shipping Service] listen `BillingService:billing` and verify status billing
8. [Shipping Service] If status billing trus emit `ShippingService:shipping` with status and date
9. [Order Service] listen `ShippingService:shipping` and include shippingStatus in order

## Autor
- name: Sidinei Silva
- email: sidinei.silva02@gmail.com
