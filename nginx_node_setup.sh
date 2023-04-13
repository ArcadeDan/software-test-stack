
touch /etc/nginx/sites-available/myapp.config

echo "server {
    listen 80;
    server_name localhost;
    location / {
        proxy_set_header X-Forwarded-For proxy_add_x_forwarded_for;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}" > /etc/nginx/sites-available/myapp.config


sudo ln -sf /etc/nginx/sites-available/myapp.config /etc/nginx/sites-enabled/
sudo systemctl restart nginx