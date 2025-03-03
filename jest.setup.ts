const { TextEncoder:UtilTextEncoder, TextDecoder: UtilTextDecoder } = require('util');
global.TextEncoder = UtilTextEncoder;
global.TextDecoder = UtilTextDecoder;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
