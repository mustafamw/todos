export interface Environment {
    production: boolean;
    api: {
        domain: string;
        path: string
    }
}