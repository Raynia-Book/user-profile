import express, { json, urlencoded } from 'express';
import config from './config';
import accountsApi from './routers/accountsApi';
import { initDB } from './db/initDB';

async function main(): Promise<void> {
    const app = express();
    const port = config.app.port;
    const host = config.app.host;

    await initDB();

    app.use(json())
    app.use(urlencoded({ extended: true}))

    // api/v1
    app.use('/api/v1/accounts', accountsApi)


    app.listen(port, () => console.log(`Server is running on ${port}`))
}
main()