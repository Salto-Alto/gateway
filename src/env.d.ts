import 'typescript'; // fake import because we need this file to be a module

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_PORT: string;
            JWT_SECRET: string;
        }
    }
}
