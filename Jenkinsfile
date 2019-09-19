pipeline {
	agent any
	stages {
		stage('Build API & frontend') {
			parallel {
				stage('Build API') {
					environment {
						AZURE_CR_CREDS = credentials('portalsolutions-cr')
					}
					steps {
						dir(path: 'scv-prototype-api') {
							sh 'mvn clean package spring-boot:repackage install'
							sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest --build-arg JAR_FILE=$(find -type f -name *.jar) .'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io && docker push portalsolutions.azurecr.io/portal-solutions/scf-prototype-api'
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
