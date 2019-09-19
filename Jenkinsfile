pipeline {
	agent any
	stages {
		stage('Build API & frontend') {
			parallel {
				stage('Build API') {
					steps {
						dir(path: 'scv-prototype-api') {
							sh 'mvn clean package spring-boot:repackage install'
							sh 'docker build --build-arg JAR_FILE=$(find -type f -name *.jar) .'
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
