# Camp Boot2Pro

Technologies used: React, Redux, Node, Express, and Mongo (mLab)

## About

Camp Boot2Pro is a full-stack social platform for coding bootcamp students to showcase their skills. Users can create profiles that will display development skills, educational and work experience, display recent GitHub repositories, create/like/unlike posts, and add comments to posts. The app also has extensive validation and error reporting.

![Camp Boot2Pro Profile Screen](cb2p-profile.PNG)

## Cloning the repo

**Note**: Once you have the repo cloned locally, you need to create a **keys_dev.js** file in the `config` folder in the repo's root in order for the app to work. The contents of **keys_dev.js** must be:

> module.exports = {
> mongoURI: "[Insert the MongoDB URI link from mLab]",
> secretOrKey: "[insert the JWT secret string of your choice]"
> };

**Note**: You will also need to register a [GitHub OAuth app](https://github.com/settings/applications/new) in order to get a **clientId** and a **clientSecret**. These need to be added to the state in client > src > components > profile > ProfileGithub.js

```
> git clone https://github.com/D-Molloy/Project_Icculus.git
> cd Project_Icculus
> npm install
> npm run client-install
> npm run dev
```

If the React development server doesn't start up, go to **http://localhost:3000/** in your browser.
