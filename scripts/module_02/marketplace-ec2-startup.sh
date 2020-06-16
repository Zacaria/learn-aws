#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
git clone https://github.com/ryanmurakami/hbfl.git /home/bitnami/hbfl
sudo chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
sudo npm i
sudo npm run start
