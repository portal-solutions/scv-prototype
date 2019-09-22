pipeline {
	agent any
	stages {
		stage('Build API & frontend') {
			parallel {
				stage('Build API (master)') {
					when {
						branch 'master'
					}
					environment {
						AZURE_CR_CREDS = credentials('portalsolutions-cr')
						VERSION = readMavenPom(file: 'scv-prototype-api/pom.xml').getVersion()
					}
					steps {
						dir(path: 'scv-prototype-api') {
							sh 'mvn --batch-mode --errors --update-snapshots clean package spring-boot:repackage'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io'
							sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION --build-arg JAR_FILE=$(find -type f -name *.jar) .'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:master'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:master'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION-staging'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION-staging'
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
				stage('Build API (non-master)') {
					when {
						not {
							branch 'master'
						}
					}
					steps {
						dir(path: 'scv-prototype-api') {
							sh 'mvn --batch-mode --errors --update-snapshots clean package spring-boot:repackage'
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
				stage('Build frontend (master)') {
					when {
						branch 'master'
					}
					environment {
						AZURE_CR_CREDS = credentials('portalsolutions-cr')
						VERSION = readJSON(file: 'scv-prototype-frontend/package.json').get('version')
					}
					steps {
						dir(path: 'scv-prototype-frontend') {
							sh 'npm install'
							sh 'npm run-script build'
							sh 'tar --transform s/build/scv-prototype-frontend/ -zcvf scv-prototype-frontend.tgz build'
							sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io'
							sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION --build-arg BUILD_DIR=build .'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:latest'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:latest'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:master'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:master'
							sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION-staging'
							sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION-staging'
						}
					}
					post {
						success {
							archiveArtifacts 'scv-prototype-frontend/**/scv-prototype-frontend.tgz'
						}
					}
				}
				stage('Build frontend (non-master)') {
					when {
						not {
							branch 'master'
						}
					}
					steps {
						dir(path: 'scv-prototype-frontend') {
							sh 'npm install'
							sh 'npm run-script build'
							sh 'tar --transform s/build/scv-prototype-frontend/ -zcvf scv-prototype-frontend.tgz build'
						}
					}
					post {
						success {
							archiveArtifacts 'scv-prototype-frontend/**/scv-prototype-frontend.tgz'
						}
					}
				}
			}
		}
	}
}
