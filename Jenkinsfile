pipeline {
  agent any
  stages {
    stage('Maven Build') {
      steps {
        dir(path: 'scv-prototype-api') {
          sh 'mvn clean install'
          archiveArtifacts '**/*.jar'
        }

      }
    }
  }
}