export interface JwtPayload {
    id: string;
    roles: string[];
}
export declare function signJwt(payload: JwtPayload, expiresIn?: number | string): string;
export declare function verifyJwt(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map