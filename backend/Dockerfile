FROM node:18 

WORKDIR /backend

# Install app dependencies
ADD . .


COPY package*.json ./
COPY .env .

RUN npm install -g nodemon
RUN npm install

EXPOSE 9000

CMD ["nodemon"]