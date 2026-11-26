import toast from 'react-hot-toast';
import { API_BASE_URL } from './apiClient.js';

// El backend gratuito de Render se duerme tras 15 min sin tráfico y puede tardar
// hasta ~1 min en despertar. Se hace ping al health check al cargar la app y, si no
// responde rápido, se avisa al usuario en lugar de dejarlo frente a una app "colgada".
const SLOW_RESPONSE_MS = 2500;
const WAKE_UP_TIMEOUT_MS = 90_000;
const TOAST_ID = 'server-wakeup';

export async function wakeUpServer() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), WAKE_UP_TIMEOUT_MS);
  let noticeShown = false;

  const slowNoticeId = window.setTimeout(() => {
    noticeShown = true;
    toast.loading('Despertando el servidor… puede tardar hasta un minuto.', { id: TOAST_ID });
  }, SLOW_RESPONSE_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Health check failed with status ${response.status}`);
    }

    if (noticeShown) {
      toast.success('Servidor listo.', { id: TOAST_ID });
    }
  } catch {
    if (noticeShown) {
      toast.error('No pudimos conectar con el servidor. Recarga la página en unos segundos.', { id: TOAST_ID });
    }
  } finally {
    window.clearTimeout(slowNoticeId);
    window.clearTimeout(timeoutId);
  }
}
