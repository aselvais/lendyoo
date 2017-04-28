# Welcome to Lendyoo

This is a mobile application for managing the items you lent to friends.
The dev is a React Native based app. So to set it up it is pretty easy:

### Clone the project via GIT

    git clone ssh://antidot.ca/home/git/repositories/lendyoo.git

### Install the dependencies via npm

    npm install
    git submodule init
    git submodule update

### Init react native and all

    npm install
    react-native upgrade
    react-native link

## Questions

- Why a lend/borrow button? I would just do a "lend", it should be the responsibility
of the item's owner to keep track of it (plus it means if the borrower want's to lend or do other actions
he has to download the app too)

## Remarks/suggestion

- location comes from the GPS, if photo gallery take it from photo if possible
- have the app used only to loan items; and for borrowers to approve the load
- (UI/UX) tag image for the persons and object instead of separate screen
- why deleting a loan? (unless it has not been 'approved' by the borrower)

## Screens

1. [Mainscreen] Welcome/help screen
2. [Authenticationscreen] Authentication
3. [Registrationscreen] Registration
4. [Loanhistoryscreen] Loans history/list
5. [Makeloanscreen] Make loan screen (with pict)
6. [Contactselectionscreen] Contact selection view
7. [Loandetailscreen] Load detailed information
8. [Contactsscreen] Connected contact view (list of persons I am connected with whom I exchange items and status on the items)


## Good references for React

https://github.com/vhpoet/react-native-styling-cheat-sheet
https://github.com/jondot/awesome-react-native


# External modules

## Update react native

    sudo npm install -g react-native-git-upgrade
    react-native-git-upgrade

## react-native-vector-icons
https://github.com/oblador/react-native-vector-icons

    npm install react-native-vector-icons --save
    react-native link
    


# Build release

## Android

Run the following command:

    cd android && ./gradlew assembleRelease 
    
Then your package is available at:

    ./android/app/build/outputs/apk/

## iOS

You will have to run Xcode then go to Product > archive; this will build an
archive and open a GUI for you to upload it to TestFlight ... 

