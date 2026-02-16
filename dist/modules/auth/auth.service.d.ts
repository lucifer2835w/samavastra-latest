export declare class AuthService {
    validateUser(email: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            roles: any[];
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map