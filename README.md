# Technical Test Project

Proyek ini adalah implementasi untuk Huawei Technical Test yang mencakup backend API, automation scripts untuk pengumpulan data, dan data processing dengan SQL.

## Struktur Proyek

```
huawei-tech-test/
├── package.json
├── automation/
│   ├── clean.js          # Script untuk menghapus file lama (>1 bulan)
│   ├── collect.js        # Script untuk mengumpulkan data
│   ├── scheduler.js      # Scheduler menggunakan node-cron
│   └── cron/             # Folder penyimpanan file CSV hasil collect
├── backend/
│   ├── index.js          # Entry point Express server
│   └── src/
│       ├── config/
│       │   └── swagger.js    # Konfigurasi Swagger
│       ├── controllers/
│       │   └── employee.controller.js  # Controller untuk employee API
│       ├── models/
│       │   └── employee.model.js       # Model data employee (in-memory)
│       ├── routers/
│       │   ├── employee.router.js      # Router untuk employee endpoints
│       │   └── index.router.js         # Main router
│       └── services/
│           └── employee.service.js     # Service layer untuk employee
└── data-processing/
    ├── create-table.sql   # SQL untuk membuat tabel employees
    └── task.sql           # Query SQL untuk manipulasi data
```

## Fitur

### Backend API
- RESTful API untuk manajemen employee
- Dokumentasi API menggunakan Swagger UI
- Endpoints: GET, POST, PUT, DELETE untuk employees

### Automation Scripts
- **Collect Data**: Mengumpulkan data 3 kali sehari (08:00, 12:00, 15:00 WIB)
- **Data Cleansing**: Menghapus file CSV yang lebih dari 1 bulan secara otomatis
- Format file: `cron_{MMDDYYYY}_{HH.MM}.csv`
- Penyimpanan di path `/home/cron` (dikonfigurasi via environment variable)

## Data Processing
- SQL scripts untuk setup database dan query manipulasi data
- Query untuk insert, update, select dengan kondisi tertentu

## Instalasi

1. Clone repository:
```bash
git clone https://github.com/VsalCode/huawei-technical-test.git
cd huawei-technical-test
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
Buat file `.env` di root directory (atau copy dari `.env.example`):
```
PORT=3000
CORN_DIR=C:\faisal\huawei-tech-test\automation\cron
```

4. Pastikan directory `automation/cron` ada dan writable (sudah tersedia).

## Penggunaan

### Menjalankan Backend
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### Dokumentasi API
Akses Swagger UI di: `http://localhost:3000/api-docs`

### Menjalankan Automation Scripts

Manual Collect Data
```bash
node automation/collect.js
```

Manual Clean Files
```bash
node automation/clean.js
```

Menjalankan Scheduler
```bash
node automation/scheduler.js
```

Scheduler akan menjalankan:
- Collect data setiap hari pukul 08:00, 12:00, 15:00 WIB
- Clean files setiap hari pukul 00:00

## API Endpoints

| Method | Endpoint | Description | Parameters/Body | Response |
|--------|----------|-------------|-----------------|----------|
| GET | /employees | Mengambil semua employees | - | Array of employee objects |
| GET | /employees/:id | Mengambil employee berdasarkan ID | id (integer) | Employee object atau 404 jika tidak ditemukan |
| POST | /employees | Membuat employee baru | Body: Employee data (name, position, joinDate, releaseDate, yearOfExperience, salary) | Created employee object |
| PUT | /employees/:id | Update employee berdasarkan ID | id (integer), Body: Updated employee data | Updated employee object |
| DELETE | /employees/:id | Menghapus employee berdasarkan ID | id (integer) | Success message |

## Dependencies

- **express**: Web framework untuk Node.js
- **dotenv**: Load environment variables
- **node-cron**: Scheduling untuk automation
- **swagger-jsdoc**: Generate Swagger specs
- **swagger-ui-express**: Serve Swagger UI

## Data Processing

Step to run SQL use docker image (postgresql) :
#### 1. Pull PostgreSQL image
```bash
docker pull postgres:17
```
#### 2. Run Container PostgreSQL
```bash
docker run -d \
  --name pg-huawei \
  -e POSTGRES_PASSWORD=admin123 \
  -p 5432:5432 \
  postgres:17
```
#### 3. Copy SQL Files ke Dalam Container
```bash
docker cp data-processing/create-table.sql pg-huawei:/create-table.sql
docker cp data-processing/task.sql pg-huawei:/task.sql
```
#### 4. Masuk ke PostgreSQL Client di Dalam Container
```bash
docker exec -it pg-huawei bash
```
#### 5. Connect ke PostgreSQL Database
```bash
psql -U postgres
```
#### 6. Buat Database dan Jalankan SQL Scripts
```sql
-- Buat database baru (opsional, atau gunakan default postgres)
CREATE DATABASE huawei_test;
\c huawei_test;

-- Jalankan create-table.sql
\i /create-table.sql

-- Jalankan task.sql
\i /task.sql
```

- File `data-processing/create-table.sql` untuk membuat table "employees" dan seed data,
- File `data-processing/task.sql` berisi query untuk:
1. Insert data baru (Albert)
2. Update salary untuk Engineer
3. Hitung total salary tahun 2021
4. Top 3 karyawan dengan experience terbanyak
5. Subquery untuk Engineer dengan experience <= 3 tahun
#### 7. Verifikasi Data
```sql
-- Lihat tabel employees
SELECT * FROM employees;

-- Keluar dari psql
\q
```
#### 8. Keluar dari Container
```bash
exit
```

## Testing

Untuk testing API, gunakan tools seperti Postman atau curl:

```bash
# Get all employees
curl http://localhost:3000/employees

# Create new employee
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","position":"Developer","joinDate":"01-Jan-25","yearOfExperience":1,"salary":100}'
```

## Troubleshooting

### Scheduler tidak berjalan
- Pastikan node-cron terinstall
- Cek timezone server (WIB = UTC+7)
- Jalankan scheduler dengan `node automation/scheduler.js`

### File CSV tidak tersimpan
- Pastikan directory `CORN_DIR` ada dan writable
- Cek environment variable `.env`

### API Error
- Pastikan server berjalan di port yang benar
- Cek logs untuk error messages
- Validate request body format

## Lisensi
[MIT](https://opensource.org/license/mit)