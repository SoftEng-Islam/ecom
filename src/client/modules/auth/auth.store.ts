import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IUser } from '@shared/types/user';
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut, type User as FirebaseUser } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref<IUser | null>(null);
    const firebaseUser = ref<FirebaseUser | null>(null);
    const token = ref<string | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Computed
    const isAuthenticated = computed(() => !!token.value && !!user.value);

    // Backend Sync
    const syncWithBackend = async (idToken: string) => {
        try {
            const response = await fetch('/api/auth/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to sync with backend');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            console.error('Sync error:', err);
            throw err;
        }
    };

    // Initialize Auth Listener
    const initAuth = () => {
        return new Promise<void>((resolve) => {
            const auth = getAuth();
            onAuthStateChanged(auth, async (fUser) => {
                if (fUser) {
                    firebaseUser.value = fUser;
                    try {
                        const idToken = await fUser.getIdToken();
                        token.value = idToken;

                        // Sync with backend
                        const data = await syncWithBackend(idToken);
                        user.value = data.user;

                        // Persist
                        localStorage.setItem('token', idToken);
                        localStorage.setItem('user', JSON.stringify(data.user));
                    } catch (err: any) {
                        console.error('Auth Init Error:', err);
                        error.value = 'Failed to authenticate';
                        logout();
                    }
                } else {
                    logout();
                }
                resolve();
            });
        });
    };

    const logout = async () => {
        try {
            const auth = getAuth();
            await firebaseSignOut(auth);
            user.value = null;
            firebaseUser.value = null;
            token.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return {
        user,
        firebaseUser,
        token,
        loading,
        error,
        isAuthenticated,
        initAuth,
        logout
    };
});
