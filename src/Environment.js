export const DEV_URL = 'https://apiproduct.datahayinfotech.com/api';

const ENVIRONMENT_LIST = {
  DEV_STAGING_MAIN: {
    baseUrl: DEV_URL,
  },

  RELEASE_PRODUCTION_MAIN: {
    baseUrl: DEV_URL,
  },
};

export const ENVIRONMENT = ENVIRONMENT_LIST.RELEASE_PRODUCTION_MAIN;
