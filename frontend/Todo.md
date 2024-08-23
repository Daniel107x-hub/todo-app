How to handle if the user remains authenticated?

1. Create a private route HOC which will check is the user is authenticated in the state
2. If user is authenticated, send it to private page
3. In private page, we will request for private resource
4. If private endpoint returns unauthorized, invalidate user session and set it as not logged in
5. Redirect it to a login page


Missing:
- When token is updated, request will fail but the cache is still getting populated and user is not getting navigated to login -> Fix using RTK Revalidation
- Find a better way to manage IDs of tokens so that they are not created with id 0 on the frontend  -> Fixed with cache revalidation, for creation purposes we could use UUID
    - API returns created todo so we can use that

[2024-08-16]  
[x] Update login page  
[x] Move all urls and paths to constants
[x] Show user details on header  
[x] Add feature to delete todos  

[2021-08-19]
[x] Associate todos with users so user will only have access to their todos
[x] Add custom loader while loading todos
[x] Add complete todo functionality
[x] Extract todo to its own component
[x] Add update todo modal
[] Create controller to get current user and call it on first load (useEffect) the root page to rehydrate current user, if not authorized, return to login
[] Add successful login toast
[] Add token ban feature on logout
[] Error handling on todo controller