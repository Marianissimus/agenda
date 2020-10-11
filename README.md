# Agenda

### Some considerations
- Uses localstorage to store contacts and make the app more realistic
- Doesn't use third-party libraries (such as vuex-persist) for the purpose of delivering an app more clearly manually worked
- The only exception is Bootstrap - which is clearly indicated in the requirements
- Also VUEX - not really required in such an app, used just for (hopefully) bonus points

### Extra-Features
Features that are not clearly indicated in the requirement, but I consider them useful. In a real-life environment, I would first ask/comment the task about them:

  - Don't allow overwriting an existing contact
  - Add some confirm modals / pop-ups
  - Allow setting the advanced filter 'name' as an empty string - it is the only way to filter all contacts in a certain group
  - Allow the first letter of the name to always display in the filtered results
  - Don't match logged-in username with the contact list. I could have set it in localhost, too, but felt it would be annoying (you would have to remember the username to see the saved list)
  - I considered using IDs and attaching them to the contacts; finally decided against it, to better fulfil the requirements


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).