FROM node:6.9

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN JOBS=MAX npm i --production && npm cache clean

# Deploy compiled source
COPY dist ./dist

# Required since port 5000 is forwarded to 80 and 443 via Dokku
EXPOSE 5000
CMD [ "npm", "start" ]