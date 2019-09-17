pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        dir(path: 'scv-prototype-api') {
          sh 'mvn clean install'
          archiveArtifacts '**/*.jar'
        }

      }
    }
  }
}