const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '.')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración de email (usa tus credenciales reales)
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com', // Cambia por tu email
        pass: 'tu-app-password'     // App Password de Google
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API para newsletter
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Guardar en base de datos (simulado)
        console.log('Nuevo suscriptor:', email);
        
        // Enviar email de confirmación
        await transporter.sendMail({
            from: 'tu-email@gmail.com',
            to: email,
            subject: '¡Bienvenido al Partido Liberal Progresista!',
            html: `
                <h2>¡Gracias por unirte a nuestro movimiento!</h2>
                <p>Recibirás las últimas noticias y propuestas.</p>
                <p>¡Juntos por un futuro mejor!</p>
            `
        });
        
        res.json({ success: true, message: 'Suscripción exitosa' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// API para donaciones
app.post('/api/donate', async (req, res) => {
    try {
        const { name, email, amount, message } = req.body;
        
        // Procesar donación (integración con Stripe/PayPal aquí)
        console.log('Nueva donación:', { name, email, amount, message });
        
        res.json({ success: true, message: 'Donación recibida, ¡gracias por tu apoyo!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error procesando donación' });
    }
});

// Ruta 404
app.use('*', (req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});