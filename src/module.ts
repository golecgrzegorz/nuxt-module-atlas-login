import { addServerHandler, defineNuxtModule, createResolver, addComponentsDir, addImportsDir, addRouteMiddleware } from '@nuxt/kit';
import { name, version } from '../package.json';
import type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    configKey: 'mongoAtlasLogin',
    version,
  },

  async setup(options, nuxt) {
    if (options.firebaseConfig) {
      nuxt.options.runtimeConfig.firebaseConfig = options.firebaseConfig;
    }
    if (options.appId) {
      nuxt.options.runtimeConfig.atlasAppId = options.appId;
    }

    const resolver = createResolver(import.meta.url);

    addServerHandler({
      route: '/api/atlas_firebase',
      handler: resolver.resolve('runtime/server/api/atlas-firebase.post'),
    });

    await addComponentsDir({
      path: resolver.resolve('runtime/components'),
      transpile: 'auto',
      global: true,
    });

    addImportsDir(resolver.resolve('runtime/composables'));

    addRouteMiddleware({
      name: 'auth',
      path: resolver.resolve('runtime/middleware/auth.ts'),
      global: false,
    });
  },
})
