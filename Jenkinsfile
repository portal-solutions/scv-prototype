pipeline {
	agent any
	stages {
		stage('Build API & frontend') {
			parallel {
				stage('Build API') {
					environment {
						AZURE_CR_CREDS = credentials('portalsolutions-cr')
						VERSION = readMavenPom(file: 'scv-prototype-api/pom.xml').getVersion()
					}
					steps {
						dir(path: 'scv-prototype-api') {
							sh 'mvn clean package spring-boot:repackage'
							sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION --build-arg JAR_FILE=$(find -type f -name *.jar) .'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io && docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io && docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest'
						}
					}
					post {
						always {
							junit 'scv-prototype-api/**/surefire-reports/**/*.xml'
						}
						success {
							archiveArtifacts 'scv-prototype-api/**/*.jar'
							archiveArtifacts 'scv-prototype-api/**/*.jar.original'
						}
					}
				}
				stage('Build frontend') {
					environment {
						AZURE_CR_CREDS = credentials('portalsolutions-cr')
						VERSION = readJSON(file: 'scv-prototype-frontend/package.json').get('version')
					}
					steps {
						dir(path: 'scv-prototype-frontend') {
							// TODO :: GjB :: run tests and record test results in Jenkins UI
							sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION .'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io && docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io && docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:latest'
						}
					}
				}
			}
		}
	}
}
