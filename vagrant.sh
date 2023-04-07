# Este es un script para Vagranfile
# vagrant provision
sudo rm -rf /home/vagrant/data
sudo mkdir -p /home/vagrant/data
echo "[...] Provision iniciando [...]"
cd /home/vagrant/workspace
ls -lsa
docker-compose stop
docker-compose rm --force
docker-compose build
docker-compose up -d
echo "[...] Provision finalizado exitosamente ! [...]"