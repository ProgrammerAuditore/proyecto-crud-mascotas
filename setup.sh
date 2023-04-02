!#/bin/bash
# Instalar Node Manager Version
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
source ~/.bashrc
nvm install node

# Crear alias para usarlo dentro vagrant
echo ""
echo "######### [ Creando Alias ] ##########"
echo 'alias doc=docker-compose' >> ~/.bashrc
echo 'alias doc-rm="docker-compose stop && docker-compose rm --force"' >> ~/.bashrc
echo 'alias doc-again="docker-compose stop && docker-compose rm --force && docker-compose build && docker-compose up"' >> ~/.bashrc
echo 'alias docker-ps-clean="docker container prune -f"' >> ~/.bashrc
echo 'alias docker-images-clean="docker rmi $(docker images -f "dangling=true" -q)"' >> ~/.bashrc
source ~/.bashrc
