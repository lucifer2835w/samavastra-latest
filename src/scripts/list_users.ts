
import { prisma } from '../config/db';

async function main() {
    console.log('--- Listing Users ---');
    try {
        const users = await prisma.user.findMany({
            include: { roles: { include: { role: true } } }
        });

        if (users.length === 0) {
            console.log('No users found in database.');
        } else {
            users.forEach(u => {
                const roles = u.roles.map((r: any) => r.role.name).join(', ');
                console.log(`User: ${u.email} | ID: ${u.id} | Roles: ${roles}`);
            });
        }
    } catch (err) {
        console.error('Error listing users:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
