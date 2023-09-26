# -*- mode: ruby -*-
# vi: set ft=ruby :

# Ejecute `vagrant up` para iniciar el proyecto actual
# con Docker y docker-compose

Vagrant.configure("2") do |config|
    # Establecer el nombre de la caja 
    config.vm.define "proyecto-crud-mascotas"
    #config.vm.hostname = "abc"

    # Usar la caja de Ubuntu 18.04LTS
    config.vm.box = "hashicorp/bionic64"
    config.vm.box_check_update = false
    
    # Montar el dicrectorio actual a la ruta absoluta
    config.vm.synced_folder "./", "/home/vagrant/workspace"
    
    # La persistencia de datos no funciona si está sincronizado
    # use disabled: true
    config.vm.synced_folder "./data", "/home/vagrant/data", 
    owner: "root", group: "root", create: true, disabled: true

    # Exponer el puerto interior de la caja ** Para Proyecto React **
    config.vm.network "forwarded_port", guest: 3080 , host: 3080, auto_correct: true

    # Exponer el puerto interior de la caja ** Para Proyecto NodeJS o API Mascota **
    config.vm.network "forwarded_port", guest: 3033 , host: 3033, auto_correct: true

    # Exponer el puerto interior de la caja ** Para MongoDB  **
    config.vm.network "forwarded_port", guest: 2780 , host: 2780, auto_correct: true

    # Actualizar repositorio la caja de Ubuntu 18.04LTS
    config.vm.provision :shell, inline: "sudo apt-get update -qq -y"
    
    # Instalar docker y descagar imagen de docker (node:16.20-slim)
    # *OJO* : Corre solo una vez usando `vagrant up`
    config.vm.provision "install-docker",
        type: "docker",
        images: ["node:16.20-slim", "mongo", "mongo:4.0"]
    
    #config.vm.provider "vmware_fusion" do |v|
    #    v.vmx["vhv.enable"] = "TRUE"
    #end

    # Instalar docker-compose
    # *OJO* : Corre solo una vez usando `vagrant up`
    config.vm.provision "install-docker-compose",
        type: "shell",
        inline: <<-SCRIPT 
        sudo rm -rf /usr/local/bin/docker-compose
        sudo rm -rf /usr/bin/docker-compose
        sudo curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
        docker-compose --version
        echo 'alias doc=docker-compose' >> ~/.bashrc
        echo 'alias doc-again="docker-compose stop && docker-compose rm --force && docker-compose build --no-cache && docker-compose up"' >> ~/.bashrc
        source ~/.bashrc
        SCRIPT
    
    # Ejecuar el proyecto actual con Docker y docker-compose
    config.vm.provision "run-setup",
    type: "shell",
    path: "./setup.sh"
    
    # Ejecuar el proyecto actual con Docker y docker-compose
    # *OJO* : Siempre corre usando `vagrant up`
    config.vm.provision "run-workspace",
        type: "shell",
        path: "./vagrant.sh",
        run: "always"

end
