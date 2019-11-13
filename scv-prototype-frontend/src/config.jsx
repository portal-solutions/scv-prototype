// Application configuration file.
//
// This configuration file contains configurations for multiple
// environments. To run the application with a specific configuration,
// you must supply the REACT_APP_ENV environment variable at startup.
//
// ex: REACT_APP_ENV=local react-scripts start
//
// You can also use a .env or .env.*.local file, as described here:
// https://create-react-app.dev/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env

//
// IMPORTANT -- DO NOT STORE SECRETS IN THIS CONFIG FILE!! (yes I know that's obvious, but must still be said)
//

const environments = {
  // 'dev' represents a localhost deployment
  dev: {
    api: {
      baseUrl: 'http://localhost:8080'
    }
  },

  // 'staging' represents our staging area in Azure
  staging: {
    api: {
      baseUrl: 'https://scv-prototype-api.azurewebsites.net'
    }
  }
};

/**
 * The currently configured environment.
 */
const environment = process.env.REACT_APP_ENV || 'staging';

if (!Object.prototype.hasOwnProperty.call(environments, environment)) {
  throw new Error(`Environment "${environment}" is not a known environment`);
}

export default {
  ...environments[environment]
};
