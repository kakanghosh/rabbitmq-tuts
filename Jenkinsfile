pipeline {
    agent any
    
    tools {nodejs "NodeJS"}

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh "npm install"
                sh "ls -lh"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
