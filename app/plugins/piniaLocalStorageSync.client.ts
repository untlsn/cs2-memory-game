import type { PiniaPluginContext } from 'pinia';

/**
 * A Pinia plugin to synchronize store state with localStorage.
 *
 * @param context - The Pinia plugin context.
 */
export function localStorageSyncPlugin({ store }: PiniaPluginContext) {
  const storedState = localStorage.getItem(store.$id);
  if (storedState) {
    try {
      store.$patch(JSON.parse(storedState));
    }
    catch (e) {
      console.error(
        `Error parsing stored state for ${store.$id}:`,
        e,
        storedState,
      );
      localStorage.removeItem(store.$id);
    }
  }

  store.$subscribe((mutation, state) => {
    try {
      localStorage.setItem(store.$id, JSON.stringify(state));
    }
    catch (e) {
      console.error(
        `Error saving state for ${store.$id} to localStorage:`,
        e,
        state,
      );
    }
  });
}

export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$pinia) {
    nuxtApp.$pinia.use(localStorageSyncPlugin);
  }
  else {
    console.warn(
      'Pinia instance not found. Is @pinia/nuxt configured correctly?',
    );
  }
});
