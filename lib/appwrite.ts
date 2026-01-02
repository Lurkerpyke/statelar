import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
    Account,
    Avatars,
    Client,
    Databases,
    OAuthProvider,
    Query,
    Storage
} from "react-native-appwrite";

export const config = {
    platform: "com.lsdev.statelar",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL("/");

        const response = await account.createOAuth2Token({
            provider: OAuthProvider.Google,
            success: redirectUri,
        });
        if (!response) throw new Error("Falha ao criar token OAuth2");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== "success")
            throw new Error("Falha ao criar token OAuth2");

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();
        if (!secret || !userId) throw new Error("Falha ao criar token OAuth2");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Falha ao criar sessão");

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        const result = await account.deleteSession({ sessionId: "current" });
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();
        if (response.$id) {
            const userAvatar = avatar.getInitials({
                name: response.name
            });

            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionId!,
            [Query.orderAsc("$createdAt"), Query.limit(5)]
        );

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({
    filter,
    query,
    limit,
}: {
    filter: string;
    query: string;
    limit?: number;
}) {
    try {
        const buildQuery = [Query.orderDesc("$createdAt")];

        if (filter && filter !== "All")
            buildQuery.push(Query.equal("type", filter));

        if (query)
            buildQuery.push(
                Query.or([
                    Query.search("name", query),
                    Query.search("address", query),
                    Query.search("type", query),
                ])
            );

        if (limit) buildQuery.push(Query.limit(limit));

        const result = await databases.listDocuments({
            databaseId: config.databaseId!,
            collectionId: config.propertiesCollectionId!,
            queries: buildQuery,
        });

        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPropertyById({ id }: { id: string }) {
    try {
        // 1. Busca a propriedade
        const property = await databases.getDocument(
            config.databaseId!,
            config.propertiesCollectionId!,
            id
        );

        let reviewsData = [];
        try {
            const reviewsResponse = await databases.listDocuments(
                config.databaseId!,
                config.reviewsCollectionId!,
                [
                    Query.equal('property', id) // ← CAMPO "property" que você criou
                ]
            );

            reviewsData = reviewsResponse.documents;

        } catch (error) {
            reviewsData = [];
        }

        // 3. Busca agente (mantenha seu código atual)
        let agentData = null;
        if (property.agent) {
            try {
                agentData = await databases.getDocument(
                    config.databaseId!,
                    config.agentsCollectionId!,
                    property.agent
                );
            } catch (error) {
                console.warn(`⚠️ Erro ao buscar agente: ${error}`);
            }
        }

        // 4. Busca galeria (mantenha seu código atual)
        let galleryData = [];
        if (property.gallery && Array.isArray(property.gallery) && property.gallery.length > 0) {
            try {
                const galleryPromises = property.gallery.map(galleryId =>
                    databases.getDocument(
                        config.databaseId!,
                        config.galleriesCollectionId!,
                        galleryId
                    ).catch(() => null)
                );
                galleryData = (await Promise.all(galleryPromises)).filter(item => item !== null);
            } catch (error) {
                console.warn("⚠️ Erro ao buscar galeria:", error);
            }
        }

        // 5. Retorna tudo combinado
        return {
            ...property,
            agent: agentData,
            reviews: reviewsData,
            gallery: galleryData,
        };
    } catch (error) {
        console.error("💥 ERRO FATAL ao buscar propriedade:", error);
        return null;
    }
}