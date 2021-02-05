# API module

This module is for intended to make API consumption easier from anywhere. It uses webpack requireModule to read contents of folder and expose it as **api**.

### **import**

```js
import api from "@/api/"
```

**OR** We could assign it to global vue namespace and get rid of importing

```js
Vue.prototype.$api = api
```

### **Usage examples**

```js
api.products.getList(parameters).then((response) => {
  //promise resolved
})
.catch(error fn)
.finally(final fn);
// OR
try{
  const response = await api.products.getList(parameters);
  // promise resolved
} catch
```

### **Adding new service**

Add a file that named as your service(products) inside **@/api/services/** folder.
They will be automatically registered to api namespace.

### **Example of a service file**

```js
// @/api/services/products.ts
import HTTP from "@/utils/http"

export default {
  getList() {
    return HTTP.get("products/getList/")
  },
}
```

**NOTE:** **HTTP** is a instance of axios and basic configurations are set inside **@/utils/http.ts** file. This is also usefull when we want to set token to our basic configuration.
