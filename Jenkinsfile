pipeline {
    agent {
        docker {
            image 'ruby:latest'
        }
    }
    stages {
        stage('Checkout') {
            steps {
//                 deleteDir()
                checkout scm
            }
        }
        stage('D/L dependencies') {
            steps {
                sh 'bundle'
            }
        }
        stage('Build') {
            steps {
                sh 'rake build:production'
            }
        }
        stage('Test site') {
            steps {
                sh 'rake test:production'
            }
        }
    }
}
