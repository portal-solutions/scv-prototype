pipeline {
	agent any
	stages {
		stage('Build API & frontend') {
			parallel {
				stage('Build API') {
					steps {
						dir(path: 'scv-prototype-api') {
							sh 'mvn clean install'
							archiveArtifacts '**/*.jar'
						}
					}
				}
				stage('Build frontend') {
					steps {
						dir(path: 'scv-prototype-frontend') {
							sh 'npm install && npm run-script dist'
							archiveArtifacts '**/scv-prototype-frontend.tgz'
						}
					}
				}
			}
		}
	}
}
