FROM centos:7

# Install CentOS GPG Key
RUN rpm --import http://vault.centos.org/RPM-GPG-KEY-CentOS-7

# Install EPEL
RUN rpm --import http://dl.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-7 && \
    yum install -y epel-release && \
    yum update -y && \
    yum clean all

RUN yum install -y --enablerepo=epel \
    nodejs npm && \
    yum clean all

# Javascript Test Suite
RUN npm -g install mocha chai sinon jsdom jquery
ENV NODE_PATH /usr/lib/node_modules

# Runtime Setting
WORKDIR /opt
