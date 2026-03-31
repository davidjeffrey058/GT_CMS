const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json())

mongoose.connect(process.env.DBURI)
.then((result) => {
    console.log('Connected')
    app.listen(process.env.PORT)
})
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to GTCMS'})
});

app.use('/api/members', memberRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({error: 'Invalid path'})
});

