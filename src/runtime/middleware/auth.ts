
export default defineNuxtRouteMiddleware(async (_to) => {
    if (!process.client) {
        return;
    }

    const store = useAtlasSession();
    const isSessionValid = await store.isAuthenticated();
    if (!isSessionValid) {
        return navigateTo('/')
    }
})
