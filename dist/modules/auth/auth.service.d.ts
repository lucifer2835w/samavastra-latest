export declare class AuthService {
    validateUser(email: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            roles: any;
        };
    } | null>;
}
//# sourceMappingURL=auth.service.d.ts.map