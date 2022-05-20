// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = '5H9iY5tEn8u2MeVbexxeDFSs8YSXCXMY4FEB8BKM';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '7R3swNQpClhdmeIKcHHl6FzWubmxHOT7a7eHWloU';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;



export default Parse