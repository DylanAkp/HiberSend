if ! which node > /dev/null
then
    echo "Node must be installed, script will be stopped"
    exit
fi
npm install hibercli
cp ./content/HiberSend ~/.local/share/nautilus/scripts/HiberSend
chmod 777 ~/.local/share/nautilus/scripts/HiberSend
echo "Installation done. Rightclick->Scripts->HiberSend"