import { Server } from 'http';
import app from './app';
import config from './config';
import seedAdmin from './app/db/seed';

async function main() {
	try {
		const server: Server = app.listen(config.port, () => {
			console.log('Sever is running on port ', config.port);
		});

		const exitHandler = () => {
			if (server) {
				server.close(() => {
					console.info('Server closed!');
				});
			}
			process.exit(1);
		};
		await seedAdmin();
		process.on('uncaughtException', (error) => {
			console.log(error);
			exitHandler();
		});

		process.on('unhandledRejection', (error) => {
			console.log(error);
			exitHandler();
		});
	} catch (error) {}
}

main();
