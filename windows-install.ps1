$curDir = $PSScriptRoot

if(!([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')) {
 Start-Process -FilePath PowerShell.exe -Verb Runas -ArgumentList "-File `"$($MyInvocation.MyCommand.Path)`"  `"$curDir`""
 Exit
}

$curDir = $Args[0]
if (Test-Path -path "C:\Program Files (x86)\HiberSend") {
    echo "HiberSend folder already exists, skipping..."
} else {
    mkdir "C:\Program Files (x86)\HiberSend"
}
if (Test-Path -path "C:\Program Files (x86)\HiberSend\hiberfile.ico") {
    echo "HiberSend icon exists, skipping..."
} else {
    cp "$curDir/content/hiberfile.ico" "C:\Program Files (x86)\HiberSend"
}
Start "https://nodejs.org/en/download/"
$Shell = New-Object -ComObject "WScript.Shell"
$Button = $Shell.Popup("Please install Node and press OK, if it's already installed, press OK.", 0, "OK", 0)
echo "Installing hibercli, all credits goes to johan-perso : https://github.com/johan-perso"
npm install --global hibercli
echo "You will need to add the right-click option to your regedit, just click yes on the next window to install"
$regScript = "$curDir/content/RightClick-Addition.reg"
Invoke-Item $regScript
echo "HiberSend is now installed"
pause