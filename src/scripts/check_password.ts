
import { prisma } from '../config/db';
import { comparePassword } from '../shared/utils/password';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const log: string[] = [];
    const logMsg = (msg: string) => {
        console.log(msg);
        log.push(msg);
    };

    try {
        const email = 'admin@samavest.com';
        const password = 'admin123';

        logMsg(`Checking user: ${email}`);
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            logMsg('❌ User NOT FOUND');
        } else {
            logMsg(`✅ User FOUND: ID=${user.id}`);
            logMsg(`   Hash: ${user.passwordHash}`);

            const isMatch = await comparePassword(password, user.passwordHash);
            if (isMatch) {
                logMsg(`✅ Password MATCHES for: ${password}`);
            } else {
                logMsg(`❌ Password DOES NOT MATCH for: ${password}`);
            }
        }
    } catch (err) {
        logMsg(`Error: ${err}`);
    } finally {
        await prisma.$disconnect();
        const outputPath = path.join(process.cwd(), 'password_check.txt');
        fs.writeFileSync(outputPath, log.join('\n'));
    }
}

main();
