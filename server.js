const express = require('express');
const app = express();
app.use(express.json());

const capes = {};

app.post('/cape', (req, res) => {
    const { uuid, cape } = req.body;
    if (!uuid || !cape) return res.status(400).json({ error: 'uuid e cape sao obrigatorios' });
    capes[uuid] = cape;
    res.json({ success: true });
});

app.delete('/cape/:uuid', (req, res) => {
    delete capes[req.params.uuid];
    res.json({ success: true });
});

app.get('/cape/:uuid', (req, res) => {
    const cape = capes[req.params.uuid];
    if (!cape) return res.status(404).json({ error: 'Jogador nao encontrado' });
    res.json({ uuid: req.params.uuid, cape });
});

app.get('/users', (req, res) => {
    res.json(Object.keys(capes));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Tesseract API rodando na porta ${PORT}`));
