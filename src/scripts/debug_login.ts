
import { prisma } from '../config/db';
import { comparePassword } from '../shared/utils/password';

async function main() {
    console.log('--- Debugging Login Credentials ---');

    const credentialsToCheck = [
        { email: 'admin@samavest.com', password: 'admin123' },
        { email: 'finance@samavest.com', password: 'staff123' },
        // Also check for a potential teacher account if one exists
        { email: 'teacher@samavest.com', password: 'teacher123' }
    ];

    for (const cred of credentialsToCheck) {
        console.log(`\nChecking user: ${cred.email}`);
        try {
            const user = await prisma.user.findUnique({
                where: { email: cred.email },
                include: { roles: { include: { role: true } } }
            });

            if (!user) {
                console.log(`❌ User NOT FOUND: ${cred.email}`);
                continue;
            }

            console.log(`✅ User FOUND: ID=${user.id}, Name=${user.firstName} ${user.lastName}`);
            console.log(`   Roles: ${user.roles.map((r: any) => r.role.name).join(', ')}`);

            const isMatch = await comparePassword(cred.password, user.passwordHash);
            if (isMatch) {
                console.log(`✅ Password MATCHES for: ${cred.password}`);
            } else {
                console.log(`❌ Password DOES NOT MATCH for: ${cred.password}`);
                console.log(`   Hash starts with: ${user.passwordHash.substring(0, 10)}...`);
            }

        } catch (error) {
            console.error(`Error checking ${cred.email}:`, error);
        }
    }

    // List all users to see who exists
    console.log('\n--- Listing All Users (First 10) ---');
    const allUsers = await prisma.user.findMany({
        take: 10,
        include: { roles: { include: { role: true } } }
    });

    allUsers.forEach(u => {
        console.log(`- ${u.email} (${u.roles.map((r: any) => r.role.name).join(', ')})`);
    });

    await prisma.$disconnect();
}

main().catch(console.error);
