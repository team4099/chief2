# chief2
Team 4099's scouting system to ingest match data and generate visualizations for the FRC 2021-2022 Rapid React competition.

# Installation

# PyCharm

In order to run the application you are going to need an IDE that does a lot of stuff for you. Install PyCharm.
- [Windows PyCharm Installation](https://www.jetbrains.com/help/pycharm/installation-guide.html#standalone)
- [macOS PyCharm Instalation](https://www.jetbrains.com/help/pycharm/installation-guide.html#c272f695)

# Github

## Windows

### Step 1 - Installing Git

1. **Download** *Git* from [Git for Windows](https://gitforwindows.org) and **install it**.

### Step 2 - Cloning the repository

1. Create a folder somewhere accessible, this will be the folder you download the Tableau file into.
2. [Copy the file path of your newly made folder](https://www.youtube.com/watch?v=MVoQhYWJuvw)

Open a command prompt window and run the following commands. If a command uses <> then don't actually put the <> when you run the command.
- Ex: `cd C:\Documents\Newsletters\Summer2018.pdf`

```
cd <YOUR_COPIED_FILE_PATH>
git clone https://github.com/team4099/Scouting-2022.git
```

## Mac OS

Open a terminal window

### Step 1 – Install [*Homebrew*](http://brew.sh/)

> *Homebrew* […] simplifies the installation of software on the Mac OS X operating system.

– [Homebrew – Wikipedia](http://en.wikipedia.org/wiki/Homebrew_%28package_management_software%29)

**Copy & paste the following** into the terminal window and **hit `Return`**.

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew doctor
```

You will be offered to install the *Command Line Developer Tools* from *Apple*. **Confirm by clicking *Install***. After the installation finished, continue installing *Homebrew* by **hitting `Return`** again.

### Step 2 – Install *Git*

**Copy & paste the following** into the terminal window and **hit `Return`**.

```shell
brew install git
```

### Step 3 - Cloning the repository

1. Create a folder somewhere accessible, this will be the folder you put stuff into.
2. [Copy the file path of your newly made folder](https://osxdaily.com/2015/11/05/copy-file-path-name-text-mac-os-x-finder/)

Open a command prompt window and run the following commands. If a command uses <> then don't actually put the <> when you run the command.
- Ex: `cd /Users/ballen/github`

```
cd <YOUR_COPIED_FILE_PATH>
git clone https://github.com/team4099/Scouting-2022.git
```

## Linux
If you're maining Linux, you'll probably already know how to install git onto your machine.

Clone this repo using this command

```
git clone https://github.com/team4099/Scouting-2022.git
```

# Zbar
If you are on MacOS (or Linux) then you need to install zbar. If you have a windows machine you can skip this step.

If you followed the instructions to install Homebrew, then you should be able to run this command without any errors. If you haven't installed homebrew then scroll up and follow homebrew installation instructions above.

To intstall zbar, all you have to do is run the following command:

```bash
brew install zbar
```

# Opening and running everything

Open the repository in PyCharm (File -> Open -> <the Git produced folder for the repo>)

## Running
To run the frontend:
```
cd frontend-form
yarn
yarn run dev
```
The frontend form will be available at http://localhost:3000/

To run the backend:
```
cd backend
pip install -r requirements.txt
python main.py
```
