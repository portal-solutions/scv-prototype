pipeline {
  agent any
  stages {
    stage('') {
      steps {
        dir(path: 'scv-pipeline-api') {
          sh 'mvn clean install'
          archiveArtifacts '**/*.jar'
        }

      }
    }
  }
}