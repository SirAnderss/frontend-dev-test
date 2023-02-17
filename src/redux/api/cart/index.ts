import { FetchResponse } from '@src/api';
import { ENVIROIMENT, WOMPI_API, WOMPI_KEY } from '@src/config';

export async function getTransactionInfo(id: string) {
  if (ENVIROIMENT === 'test') {
    return {
      ok: true,
      data: {},
    };
  }

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${WOMPI_KEY}`);

  let response: FetchResponse;

  try {
    // consume service from api
    const res = await fetch(`${WOMPI_API}/transactions/${id}`, {
      headers,
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
