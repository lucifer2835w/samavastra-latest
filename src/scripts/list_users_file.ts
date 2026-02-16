
import { prisma } from '../config/db';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    try {
        const users = await prisma.user.findMany({
            include: { roles: { include: { role: true } } }
        });

        const lines = users.map(u => {
            const roles = u.roles.map((r: any) => r.role.name).join(', ');
            return `User: ${u.email} | ID: ${u.id} | Roles: ${roles}`;
        });

        const outputPath = path.join(process.cwd(), 'users_list.txt');
        fs.writeFileSync(outputPath, lines.join('\n'));
        console.log(`Wrote ${lines.length} users to ${outputPath}`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
