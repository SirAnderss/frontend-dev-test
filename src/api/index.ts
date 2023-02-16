interface FetchApiParams {
  url: string;
  param?: string;
  body?: object;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
}

export interface FetchResponse {
  ok: boolean;
  message?: string;
  data?: unknown;
}
export async function fetchToApi({
  url,
  param,
  body,
  method = 'GET',
}: FetchApiParams) {
  // set fetch headers
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  let response: FetchResponse;

  try {
    // consume service from api
    const res = await fetch(param ? `${url}/${param}` : url, {
      headers,
      body: JSON.stringify(body),
      method,
    });

    const data = await res.json();

    response = {
      ok: true,
      data,
    };
  } catch (err) {
    console.error(err);

    const error = err as Error;

    response = {
      ok: false,
      message: error.message,
    };
  }

  return response;
}
