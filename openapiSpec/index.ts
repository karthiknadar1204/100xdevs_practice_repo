import express from 'express';
import {apiDocumentation} from './openapispec';
import swaggerUi from 'swagger-ui-express';
const app = express();
const port = 3000;

app.use(express.json());

// biome-ignore lint/style/useConst: <explanation>
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

app.get('/users', (req, res) => {
    const nameParam = req.query.name;
    const name = typeof nameParam === 'string' ? nameParam : '';

    if (name) {
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        res.json(filteredUsers);
    } else {
        res.json(users);
    }
});

app.use('/documentation',swaggerUi.serve,swaggerUi.setup(apiDocumentation))

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});