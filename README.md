# SCV Prototype

[![Build Status](https://portal-solutions-ci.canadacentral.cloudapp.azure.com/buildStatus/icon?job=scv-prototype%2Fmaster)](https://portal-solutions-ci.canadacentral.cloudapp.azure.com/job/scv-prototype/job/master/)

A simple prototype with ReactJS and an API to demonstrate connectivity with MDM.

## Build and runtime environment

### Jenkins CI

Jenkins CI instance is located at [https://portal-solutions-ci.canadacentral.cloudapp.azure.com/](https://portal-solutions-ci.canadacentral.cloudapp.azure.com/). Log in using Azure AD credentials.

Jenkins pipeline will build the frontend and backend application in parallel steps. It will then package each
into its own respective Docker image and push the docker image into our private Azure Container Registry.

Jenkins will tag each Docker image with the following information:

- 'x.y.z' -- current *latest* build of this application version (**important note:** this tag is mutable so v1.0.0 today might not be v1.0.0 tomorrow)
- 'latest' -- latest build from the *master* branch
- 'staging' -- build that will be deployed to the staging area (managed automatically by Azure Web Apps)

A future update to the pipeline will add a commit hash or build number to the image tag to allow us to pick specific
commits for deployment, as well as potentially add more target-environment tags (such as testing, QA, and even production).

### Container registry

Our Azure Container Registry is located at [https://portalsolutions.azurecr.io/](https://portalsolutions.azurecr.io/).
Log in using Azure AD credentials.

### Backend: `scv-prototype-api` Azure Web App Service

The backend docker image is deployed to a *Web App for Containers* instance in Azure. This app service has been configured
to always deploy the latest image tagged with *staging*, effectively providing continuous deployment into this container.

The front-facing URL for the API is: [https://scv-prototype-api.azurewebsites.net](https://scv-prototype-api.azurewebsites.net).

### Frontend: `scv-prototype-frontend` Azure Web App Service

The frontend docker image is deployed to a *Web App for Containers* instance in Azure. This app service has been configured
to always deploy the latest image tagged with *staging*, effectively providing continuous deployment into this container.

The front-facing URL for the API is: [https://scv-prototype-frontend.azurewebsites.net](https://scv-prototype-frontend.azurewebsites.net).

## Other resources

- [API README](scv-prototype-api/README.md)
- [Frontend README](scv-prototype-frontend/README.md)
