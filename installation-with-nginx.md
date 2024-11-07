## postman
```bash
https://documenter.getpostman.com/view/5031613/2sAY519LaD
```

## Installation Project


```bash
$ pnpm install
```

## Useful command

```bash
# update database schema
$ pnpm db:push

# generate model from connection
$ pnpm db:pull

# generate db client
$ pnpm db:generate

# create new feature with single command
$ pnpm make:app
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```


## Setup pm2
```bash
# update package
sudo apt update

# install pm2
sudo npm install pm2@latest -g

#run project with pm2
pm2 start "pnpm run start" --name "final-api-be"
or 
pm2 start dist/main.js --name "final-api-be"


```

## Setup Nginx
```bash
# update package
sudo apt update

# install nginx
sudo apt install nginx

# configuration nginx
sudo nano /etc/nginx/sites-available/final-api-be

# copy 
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Optional: Redirect HTTP to HTTPS
    # Uncomment the lines below if you set up SSL later
    # location / {
    #     return 301 https://$host$request_uri;
    # }
}

# enable nginx configuration
sudo ln -s /etc/nginx/sites-available/final-api-be /etc/nginx/sites-enabled/

# check nginx configuration
sudo nginx -t

# restart nginx
sudo systemctl restart nginx

```

## setup firewall
```bash
# check status firewall
sudo ufw status

sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 22    # SSH

# enable firewall
sudo ufw enable

#check status firewall
sudo ufw status

```

