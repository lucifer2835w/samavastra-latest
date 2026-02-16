import { prisma } from '../../config/db';
import { Prisma } from '../../generated/prisma/client';

export class DepartmentService {
    async createDepartment(data: { name: string; code: string }) {
        return prisma.department.create({
            data: {
                name: data.name,
                code: data.code,
            },
        });
    }

    async getAllDepartments() {
        return prisma.department.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async getDepartmentById(id: number) {
        return prisma.department.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });
    }
}
