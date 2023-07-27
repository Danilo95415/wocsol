import NextAuth from 'next-auth';
import { serialize } from 'cookie';

const options = {
  providers: [], // Empty providers array since you're not using any specific providers

  callbacks: {
    signIn: async (user, account, profile) => {
      // Implement your custom login logic here
      try {
        // Call your login API here
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(user), // Send user data to the API
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.ok && !data.error) {
          // Call NextAuth signIn event to complete the authentication process

          // Set the session cookie
          res.setHeader('Set-Cookie', serialize('myCustomSessionCookie', data.sessionToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // Set the cookie expiration in seconds (e.g., 7 days)
            sameSite: 'lax', // Set the cookie same-site policy
            secure: process.env.NODE_ENV === 'production', // Set whether the cookie should be secure (HTTPS only)
          }));

          return Promise.resolve(true);
        } else {
          // Return false or throw an error if login failed
          return Promise.resolve(false);
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error(error);
        return Promise.resolve(false);
      }
    },
  },
  session: {
    // Customize session options if needed
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set the maximum session age in milliseconds (e.g., 30 days)
    rolling: true, // Enable session rolling, which extends the session expiration on each request
    cookieName: 'myCustomSessionCookie', // Set a custom session cookie name
    cookie: {
      // Set session cookie options
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // Set the cookie expiration in seconds (e.g., 7 days)
      sameSite: 'lax', // Set the cookie same-site policy
      secure: process.env.NODE_ENV === 'production', // Set whether the cookie should be secure (HTTPS only)
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
