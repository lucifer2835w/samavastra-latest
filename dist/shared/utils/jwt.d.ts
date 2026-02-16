export interface JwtPayload {
    id: number;
    roles: string[];
}
export declare function signJwt(payload: JwtPayload, expiresIn?: number | string): string;
export declare function verifyJwt(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map