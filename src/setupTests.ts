import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { TextEncoder, TextDecoder as NodeTextDecoder } from 'node:util';

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;
