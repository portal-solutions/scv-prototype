def SLACK_COLOR_MAP = [ 'SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger' ]

pipeline {
	agent any
	options {
		buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
	}
	stages {
		stage('Build API & frontend') {
			parallel {
				stage('Build API') {
					stages {
						stage('Build API (maven artifact)') {
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
						stage('Build API (docker images)') {
							environment {
								AZURE_CR_CREDS = credentials('portalsolutions-cr')
								VERSION = readMavenPom(file: 'scv-prototype-api/pom.xml').getVersion()
							}
							when {
								branch 'master'
							}
							steps {
								dir(path: 'scv-prototype-api') {
									sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io'

									// build statically versioned image (ex: v1.0.0)
									sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION --build-arg JAR_FILE=$(find -type f -name *.jar) .'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION'

									// build dynamically versioned 'latest' image (TODO :: GjB :: this should only happen for release builds)
									sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:latest'

									// build dynamically versioned 'master' image (TODO :: GjB :: can the branch name be pulled from environment?)
									sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:master'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:master'

									// build dynamically versioned '{environment-name}' image
									sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:staging'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-api:staging'
								}
							}
						}
					}
				}
				stage('Build frontend') {
					stages {
						stage('Build frontend (npm artifact)') {
							steps {
								dir(path: 'scv-prototype-frontend') {
									sh 'npm install'
									sh 'npm run-script build'
									sh 'tar --transform s/build/scv-prototype-frontend/ -zcvf scv-prototype-frontend.tgz build'
									stash name: 'frontend', includes: 'build/**'
								}
							}
							post {
								success {
									archiveArtifacts 'scv-prototype-frontend/**/scv-prototype-frontend.tgz'
								}
							}
						}
						stage('Build frontend (docker images)') {
							when {
								branch 'master'
							}
							environment {
								AZURE_CR_CREDS = credentials('portalsolutions-cr')
								VERSION = readJSON(file: 'scv-prototype-frontend/package.json').get('version')
							}
							steps {
								dir(path: 'scv-prototype-frontend') {
									unstash 'frontend'
									sh 'docker login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW portalsolutions.azurecr.io'

									// build statically versioned image (ex: v1.0.0)
									sh 'docker build -t portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION --build-arg BUILD_DIR=build .'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION'

									// build dynamically versioned 'latest' image (TODO :: GjB :: this should only happen for release builds)
									sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:latest'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:latest'

									// build dynamically versioned 'master' image (TODO :: GjB :: can the branch name be pulled from environment?)
									sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:master'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:master'

									// build dynamically versioned '{environment-name}' image
									sh 'docker tag portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:$VERSION portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:staging'
									sh 'docker push portalsolutions.azurecr.io/portal-solutions/scv-prototype-frontend:staging'
								}
							}
						}
					}
				}
			}
		}
		stage('Clean up dangling docker images') {
			environment {
				AZURE_CR_CREDS = credentials('gregory-j-baker')
			}
			steps {
				sh 'docker rmi $(docker images -q -f dangling=true) || true'
				sh 'az login -u $AZURE_CR_CREDS_USR -p $AZURE_CR_CREDS_PSW'
				sh 'az acr repository show-manifests --name portalsolutions --repository portal-solutions/scv-prototype-frontend --query "[?tags[0]==null].digest" -o tsv | xargs -I% az acr repository delete --name portalsolutions --image portal-solutions/scv-prototype-frontend@% --yes || true'
				sh 'az acr repository show-manifests --name portalsolutions --repository portal-solutions/scv-prototype-api --query "[?tags[0]==null].digest" -o tsv | xargs -I% az acr repository delete --name portalsolutions --image portal-solutions/scv-prototype-api@% --yes || true'
			}
		}
	}
	post {
		always {
			slackSend channel: '#builds', teamDomain: 'scv-prototype', tokenCredentialId: 'slack-scv-prototype', color: SLACK_COLOR_MAP[ currentBuild.currentResult ],
					message: "*${ currentBuild.currentResult }:* Job ${ env.JOB_NAME } build ${ env.BUILD_NUMBER }\n More info at: ${ env.BUILD_URL }"
		}
	}
}
