import { Admin, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const adminData = {
	password: 'password',
	admin: {
		name: 'Admin User',
		email: 'admin@admin.com',
	},
};

async function seedAdmin() {
	try {
		// Check if admin user already exists
		const existingAdmin = await prisma.admin.findUnique({
			where: {
				email: adminData.admin.email,
			},
		});

		if (existingAdmin) {
			console.log('Admin already exists.');
			// clearDatabase();

			return;
		}
		const hashedPassword: string = await bcrypt.hash(adminData.password, 12);
		const userData = {
			email: adminData.admin.email,
			password: hashedPassword,
			role: Role.ADMIN,
		};
		// Create an admin user

		const result = await prisma.$transaction(async (transactionClient) => {
			await transactionClient.user.create({
				data: userData,
			});

			const createdAdminData = await transactionClient.admin.create({
				data: adminData.admin,
			});

			return createdAdminData;
		});
	} catch (error) {
		console.error('Error seeding admin:', error);
	} finally {
		await prisma.$disconnect();
	}
}

const clearDatabase = async () => {
	try {
		// Delete all data in Booking
		await prisma.booking.deleteMany({});

		// Delete all data in Schedule
		await prisma.schedule.deleteMany({});

		// Delete all data in Trainee
		await prisma.trainee.deleteMany({});

		// Delete all data in Trainer
		await prisma.trainer.deleteMany({});

		// If you have additional models, include them here
		console.log('All data deleted successfully!');
	} catch (error) {
		console.error('Error deleting data:', error);
	}
};

export default seedAdmin;
