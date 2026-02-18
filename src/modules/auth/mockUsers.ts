export const MOCK_USERS: Record<string, any> = {
    'admin@samavest.com': {
        id: 1,
        email: 'admin@samavest.com',
        firstName: 'Dev',
        lastName: 'Admin',
        roles: ['ADMIN'],
        isActive: true
    },
    'teacher@chalkboard.com': {
        id: 2,
        email: 'teacher@chalkboard.com',
        firstName: 'Dev',
        lastName: 'Teacher',
        roles: ['TEACHER'],
        isActive: true,
        teacher: { id: 1, userId: 2, employeeId: 'EMP001' }
    },
    'student@chalkboard.com': {
        id: 3,
        email: 'student@chalkboard.com',
        firstName: 'Dev',
        lastName: 'Student',
        roles: ['STUDENT'],
        isActive: true,
        student: { id: 1, userId: 3, studentNumber: 'STU001', status: 'Active' }
    },
    'parent@chalkboard.com': {
        id: 4,
        email: 'parent@chalkboard.com',
        firstName: 'Dev',
        lastName: 'Parent',
        roles: ['PARENT'],
        isActive: true
    },
    // Add UI-displayed emails (aliases for existing mocks)
    'jane.smith@school.com': {
        id: 5,
        email: 'jane.smith@school.com',
        firstName: 'Jane',
        lastName: 'Smith',
        roles: ['TEACHER'],
        isActive: true,
        teacher: { id: 1, userId: 5, employeeId: 'EMP001' }
    },
    'admin@school.com': {
        id: 6,
        email: 'admin@school.com',
        firstName: 'School',
        lastName: 'Admin',
        roles: ['SCHOOL_ADMIN'], // Ensure SCHOOL_ADMIN role exists or map to ADMIN
        isActive: true
    },
    'john.doe@chalkboard.com': {
        id: 7,
        email: 'john.doe@chalkboard.com',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['STUDENT'],
        isActive: true,
        student: { id: 1, userId: 7, studentNumber: 'STU001', status: 'Active' }
    },
    'finance@samavest.com': {
        id: 8,
        email: 'finance@samavest.com',
        firstName: 'Finance',
        lastName: 'Manager',
        roles: ['STAFF'],
        isActive: true,
        department: { id: 2, code: 'FIN', name: 'Finance' }
    }
};

export const MOCK_USERS_BY_ID = Object.values(MOCK_USERS).reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {} as Record<string, any>);
