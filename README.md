# proj.contactApp

## fix MongoDB Port in use

```bash
sudo netstat -tulnp | grep 27017
    tcp        0      0 127.0.0.1:27017         0.0.0.0:*               LISTEN      57103/mongod

sudo kill 57103

mkdir -p ./mongodb-data
# Run The database
mongod --dbpath ./mongodb-data --port 27017 --unixSocketPrefix ./mongodb-socket
```
