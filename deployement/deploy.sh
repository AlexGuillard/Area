#!/bin/bash

ansible-playbook ./playbooks/playbook.yml -i inventory

# if you use this file to deploy, don't forget to create a `.env` file in this folder with same content as explained in the README.md file
