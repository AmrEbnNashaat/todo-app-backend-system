import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import routes from "./routes/routes"
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/todos', routes);
app.use('/users', userRoutes);

const dbUri = config.get<string>("dbUri");
const port = config.get<number>("port");

mongoose.connect(dbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Could not connect to MongoDB:', error));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
