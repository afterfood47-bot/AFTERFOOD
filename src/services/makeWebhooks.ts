export const MAKE_WEBHOOKS = {
  CLIENT_REGISTER: 'https://hook.us2.make.com/v7vn1rq1ukwc4ut4fum7f7e0kqwyk2ay',
  COURIER_REGISTER: 'https://hook.us2.make.com/2qlg54ghtlditt2la9spbwb8but1coey',
  MERCHANT_REGISTER: 'https://hook.us2.make.com/it89u44skfpidhvar3u298rm78t5gagk',
} as const;

export interface SerializedFileInfo {
  name: string;
  size: number;
  type: string;
}

export function serializeFileField(
  file: File | SerializedFileInfo | string | null | undefined
): SerializedFileInfo | string | null {
  if (!file) return null;
  if (typeof file === 'string') return file;
  if (file instanceof File) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }
  return file;
}

export async function submitToMakeWebhook(
  url: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number; responseText: string }> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text().catch(() => '');

  if (!response.ok) {
    throw new Error(
      responseText || `Error al enviar los datos (${response.status})`
    );
  }

  return {
    ok: true,
    status: response.status,
    responseText,
  };
}
