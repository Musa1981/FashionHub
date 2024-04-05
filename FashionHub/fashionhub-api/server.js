const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('src/images'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fashionhub'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Ansluten till MySQL-databasen');
});

app.post('/fashionhub/users/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) {
                res.status(500).send('Det uppstod ett fel vid skapande av användaren');
                throw err;
            }
            console.log('Användare skapad:', result);
            res.status(200).send('Användare skapad');
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Det uppstod ett fel vid skapande av användaren');
    }
});

app.post('/fashionhub/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], async (err, result) => {
            if (err) {
                res.status(500).send('Det uppstod ett fel vid inloggning');
                throw err;
            }
            if (result.length === 0) {
                res.status(401).send('Felaktigt användarnamn eller lösenord');
            } else {
                const user = result[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    res.status(200).json({ message: 'Inloggning lyckades' });
                } else {
                    res.status(401).send('Felaktigt användarnamn eller lösenord');
                }
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Det uppstod ett fel vid inloggning');
    }
});

app.get('/fashionhub/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Det uppstod ett fel vid hämtning av användare');
            throw err;
        }
        res.json(result);
    });
});

app.get('/fashionhub/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Det uppstod ett fel vid hämtning av produkter');
            throw err;
        }
        res.json(result);
    });
});

app.get('/fashionhub/product/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ' + id;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Det uppstod ett fel vid hämtning av produkt på id: ' + id);
            throw err;
        }
        res.json(result);
    });
});

app.post('/fashionhub/products', (req, res) => {
    const { name, price } = req.body;
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], (err, result) => {
        if (err) {
            res.status(500).send('Det uppstod ett fel vid tillägg av produkten');
            throw err;
        }
        console.log('Produkt tillagd:', result);
        res.status(200).send('Produkt tillagd');
    });
});

app.get('/fashionhub/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Det uppstod ett fel vid hämtning av orderhistorik');
            throw err;
        }
        res.json(result);
    });
});

app.post('/fashionhub/orders', (req, res) => {
    const { email, total_price } = req.body; // Hämta e-postadress och totalt pris från förfrågan
    const created_at = new Date().toISOString(); // Skapa en tidsstämpel för när ordern skapas

    // Hämta användarens ID från databasen baserat på e-postadressen
    const getUserIDQuery = 'SELECT id FROM users WHERE email = ?';
    db.query(getUserIDQuery, [email], (err, userResult) => {
        if (err) {
            res.status(500).send('Det uppstod ett fel vid hämtning av användarens ID');
            throw err;
        }

        if (userResult.length === 0) {
            res.status(404).send('Användaren hittades inte');
            return;
        }

        const customer_id = userResult[0].id; // Användarens ID från databasen

        // Infoga ordern i databasen med användarens ID och totala priset
        const insertOrderQuery = 'INSERT INTO orders (customer_id, total_price, created_at) VALUES (?, ?, ?)';
        db.query(insertOrderQuery, [customer_id, total_price, created_at], (err, result) => {
            if (err) {
                res.status(500).send('Det uppstod ett fel vid tillägg av ordern');
                throw err;
            }
            console.log('Order tillagd:', result);
            res.status(200).send('Order tillagd');
        });
    });
});




app.listen(PORT, () => {
    console.log(`Servern är igång på port ${PORT}`);
});
