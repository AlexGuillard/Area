#!/bin/bash

set ANSIBLE_CONFIG=./deployement/ansible.cfg

ansible-playbook ./deployement/playbooks/playbook.yml -i ./deployement/inventory
