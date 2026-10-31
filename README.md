# Mohamed Shahid | Dynamic Portfolio REST API (Backend)

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud_Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![JWT](https://img.shields.io/badge/Auth-JWT_%26_Bcrypt-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io)

Scalable Express.js & MongoDB REST API engine powering Mohamed Shahid's full-stack dynamic portfolio. Features pure dynamic data lifecycle management, resilient fallback architecture, authenticated Admin CMS CRUD endpoints, and live MongoDB Atlas cloud integration.

---

## Architectural Highlights

- **Pure Dynamic Data Lifecycle**: Zero static mock fallbacks. Public endpoints strictly deliver the live state of MongoDB collections.
- **MongoDB Atlas Cloud Connection**: Built on Mongoose with TLS handshake, SRV connection strings, and automated cloud seeding.
- **Resilient Fallback Engine**: If database connection is interrupted, the backend automatically activates an in-memory cache mode to prevent server downtime.
- **JWT & Bcrypt Security**: Admin authentication endpoints generate signed JSON Web Tokens and validate against salt-hashed passwords.
- **Real-Time Client Synchronization**: Optimized for client-side 4-second polling and window focus listeners.

---

## REST API Endpoints

### 1. Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API welcome manifest & root health check. |
| `GET` | `/api/portfolio` | Returns full portfolio data (profile, projects, skills, timeline). |
| `GET` | `/api/health` | Returns server health, uptime, and database connection status (aliases: `/health`). Render Health Check Path. |
| `POST` | `/api/contact` | Submits a recruiter / collaboration message into MongoDB. |

### 2. Admin Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticates admin credentials and returns a Bearer JWT token. |
| `GET` | `/api/auth/me` | Validates session token and returns active admin user details. |

### 3. Protected Content Management (Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `PUT` | `/api/portfolio/profile` | Updates developer profile, bio, socials, and avatar. |
| `POST` / `PUT` / `DELETE` | `/api/portfolio/projects[/:id]` | Full CRUD for portfolio projects. |
| `POST` / `PUT` / `DELETE` | `/api/portfolio/skills[/:id]` | Full CRUD for technical skills matrix. |
| `POST` / `PUT` / `DELETE` | `/api/portfolio/experiences[/:id]` | Full CRUD for work experience entries. |
| `POST` / `PUT` / `DELETE` | `/api/portfolio/education[/:id]` | Full CRUD for academic milestones. |
| `GET` / `PUT` / `DELETE` | `/api/contact/messages[/:id]` | Manage incoming recruiter inquiries. |

---

## Getting Started

### 1. Installation
```bash
git clone https://github.com/Shahid-cs22/shahidinfo-backend.git
cd shahidinfo-backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root of the backend directory (refer to `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
```

### 3. Database Seeding
Seed initial authentic portfolio records and admin credentials into MongoDB:
```bash
npm run seed
```

---

## Render Cloud Deployment

When deploying this backend to **[Render](https://render.com/)** as a Web Service:

- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Health Check Path**: `/api/health`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `MONGODB_URI`: `mongodb+srv://<username>:<password>@project.jhqu6wj.mongodb.net/portfolio?retryWrites=true&w=majority`
  - `JWT_SECRET`: `<your_secret_key>`


### 4. Running the Server
```bash
# Production / Standard start
npm start

# Development mode (with nodemon)
npm run dev
```

Server starts at [http://localhost:5000](http://localhost:5000).

---

## Author
**Mohamed Shahid**
- GitHub: [@Shahid-cs22](https://github.com/Shahid-cs22)
- LinkedIn: [Mohamed Shahid](https://www.linkedin.com/in/infoshahid)
- Email: [moh.shahid2004@gmail.com](mailto:moh.shahid2004@gmail.com)

