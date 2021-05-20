FROM node:14-alpine

# Set the timezone in docker
RUN apk --update add tzdata &&\
		cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime &&\
   	echo "Asia/Jakarta" > /etc/timezone &&\
   	apk del tzdata

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN yarn install

# Copy all other source code to work directory
ADD . /usr/src/app

# TypeScript
RUN yarn build

# Start
CMD [ "yarn", "start" ]
