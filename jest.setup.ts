import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import { enableFetchMocks } from 'jest-fetch-mock';

process.env.VITE_ENVIROIMENT = 'test';
process.env.VITE_API_URL = '/api';
process.env.VITE_WOMPI_KEY = 'pub_test_uNUJToElBhVZ47ERWaDG9yNBc9wASX28';
process.env.VITE_WOMPI_REDRECT = 'http://localhost:5173/checkout';
process.env.VITE_WOMPI_API = 'https://sandbox.wompi.co/v1';

enableFetchMocks();
