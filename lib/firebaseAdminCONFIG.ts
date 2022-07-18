export const service={
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
}

console.log(service.client_email);