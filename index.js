import express from 'express'
import pg from 'pg'

const app = express()
const port = 3000


const { Pool } = pg

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Inisialisasi pool koneksi
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: '21914113',
    port: 5432
})

app.get('/', async (req, res) => {
    try {
        const testdata = await pool.query('SELECT * FROM biodata')
        console.log(testdata.rows)
        
        // Kirim respon JSON data mahasiswa ke client
        res.status(200).json({
            message: "TEST DATA :",
            data: testdata.rows
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})

