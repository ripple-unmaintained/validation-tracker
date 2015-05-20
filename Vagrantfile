# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network :private_network, ip: "192.168.111.222"

  config.vm.provision "ansible" do |ansible|

    ansible.playbook   = "ansible/playbook.yml"

    ansible.extra_vars = {
      ansible_ssh_host: "127.0.0.1",
      ansible_ssh_user: "vagrant"
    }
  end
end
