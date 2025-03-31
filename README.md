# Stock Trading App – High-Performance Distributed System

A containerized stock trading platform built to endure high-throughput, real-world simulation; sustaining over 17,000 concurrent users under load. The system executes market and limit orders via a custom FIFO matching engine, ensures atomic transaction integrity, and scales through Docker-managed microservices.

Performance bottlenecks were addressed through targeted JMeter stress testing, Redis-based concurrency control, and HAProxy-NGINX experimentation. Complexities like VM crashes, mutex race conditions, and HTTP timeouts were resolved through iterative refactoring and architecture rollback strategies.

[![Dockerized](https://img.shields.io/badge/Built%20With-Docker-blue)](https://www.docker.com/)  
[![JMeter Tested](https://img.shields.io/badge/Tested%20With-JMeter-red)](https://jmeter.apache.org/)  
[![Scalability-Optimized](https://img.shields.io/badge/Scalability-Optimized-brightgreen)](#)
[![JWT Auth](https://img.shields.io/badge/Security-JWT%20Auth-yellowgreen)](https://jwt.io/)
[![Redis Caching](https://img.shields.io/badge/Concurrency-Redis%20Mutex-blueviolet)](https://redis.io/)
[![Custom Matching Engine](https://img.shields.io/badge/Engine-Custom%20FIFO%20Matching-9cf)](#)
[![Microservices Architecture](https://img.shields.io/badge/Architecture-Microservices-informational)](#)
[![High Availability](https://img.shields.io/badge/Design-Fault%20Tolerant-success)](#)

## 📊 Benchmark Results

| Simulated Users | Error Rate   |
|------------------|--------------|
| 1,000            | 0.00%        |
| 10,000           | 3.94%        |
| 12,000           | 6.07%        |
| 15,000           | 8.70%        |
| **17,000**       | **14.04%**   |


## 🧪 Performance Testing Workflow

> Port: `4000`  

### 1. Clone the Repo

```bash
git clone https://github.com/danigallegdup/Stock_Trading_App
cd Stock_Trading_App
```

---

### 2. Build and Start the Services

```bash
docker compose up -d --build
```

---

### 3. System Initialization

```bash
cd TestRun3
nano Config/stockIds.csv
# Ensure it's empty
# CTRL+O to save, CTRL+X to exit
```

Then initialize baseline stocks:

```bash
jmeter -n -t ./InitialSetup.jmx
```

> 🔍 Verify `Config/stockIds.csv` has no extra lines before proceeding.

---

### 4. Simulate 17k+ Concurrent Users

```bash
HEAP="-Xms1g -Xmx4g -XX:MaxMetaspaceSize=256m" \
jmeter -n -t test17k.jmx -l 17k_results.log -e -o 17k_results
```

View detailed test results:
```
17k_results/index.html
```

---

### 5. Clean Shutdown

```bash
docker compose down -v
```

---

## Project Highlights

- **Simulates 17,000+ concurrent users**
- **Custom-built FIFO matching engine**
- **Secure JWT authentication**
- **Fully containerized with Docker Compose**
- **Stress-tested with JMeter & dynamic load scripts**
- **Persistent storage with transactional integrity**
- **Optimized for fault-tolerance and concurrency control**

---

## 🔧 Tech Stack

| Category         | Tech                             |
|------------------|----------------------------------|
| Backend API      | Node.js, Express.js              |
| Containerization | Docker, Docker Compose           |
| Load Testing     | Apache JMeter                    |
| Authentication   | JWT (JSON Web Tokens)            |
| Caching/Locks    | Redis (for concurrency control)  |
| Logging & Results| HTML Reports via JMeter Dashboard|

---
## 📂 Repo Structure

```
├── backend/
│   ├── auth/                    # Handles login, registration, and JWT token generation
│   ├── config/                  # App configuration (e.g., DB, constants)
│   ├── matchingEngine/          # Custom FIFO matching engine for order execution
│   ├── middleware/              # Authentication and error-handling middleware
│   ├── order/                   # Endpoints and logic for placing and managing orders
│   ├── transaction/             # Wallet and stock transaction tracking
│   ├── userManagement/          # User profile and account services
│   ├── Dockerfile               # Container config for backend service
│   ├── index.js                 # Main server entry point
│   ...
├── docker-compose.yml           # Docker orchestration for all services
```

