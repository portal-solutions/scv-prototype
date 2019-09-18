pipeline {
  agent any
  stages {
    stage('Maven Build') {
      parallel {
        stage('Maven Build') {
          steps {
            dir(path: 'scv-prototype-api') {
              sh 'mvn clean install'
              archiveArtifacts '**/*.jar'
            }

          }
        }
        stage('Build Frontend') {
          steps {
            dir(path: 'scv-prototype-frontend') {
              sh 'npm install && npm run-script build'
              archiveArtifacts '**/scv-prototype-frontend.zip'
            }

          }
        }
      }
    }
  }
}