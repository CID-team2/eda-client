FROM centos:7.9.2009

RUN yum update -y && \
    yum install -y git

RUN curl --silent --location https://rpm.nodesource.com/setup_14.x | bash - && \
        yum install -y nodejs
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
        rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg && \
        yum install -y yarn

RUN git clone https://github.com/CID-team2/eda-client.git /opt/eda-client

ENV PATH /opt/eda-client:$PATH

WORKDIR /opt/eda-client

# update package.json
RUN git pull

RUN yarn install --production --silent
RUN yarn global add react-scripts@3.4.1 --silent
RUN yarn build

# disable cache by giving the argument (with time)
ARG CACHEBUST

CMD yarn start
