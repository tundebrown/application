export const authConfig = {
  providers:[],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      // const isLoggedIn = false;
      // const isOnDashboard = request.nextUrl.pathname.startsWith("/nothing");
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      const isOnWebPath = request.nextUrl.pathname.startsWith("/");
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const isOnPagePath = request.nextUrl.pathname.startsWith("/page");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};
