export const useAuth = () => {
  const handleAuth0Response = (response: {
    access_token: string;
    id_token: string;
    user_id: string;
    expires_in: number;
    expires_at: number;
  }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("id_token", response.id_token);
      localStorage.setItem("user_id", response?.user_id);
      if (response.expires_in) {
        localStorage.setItem(
          "expires_at",
          JSON.stringify(response.expires_in * 1000 + new Date().getTime())
        );
      } else {
        localStorage.setItem(
          "expires_at",
          JSON.stringify(response.expires_at * 1000 + new Date().getTime())
        );
      }
    }
  };

  const get_user_id = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_id");
    }
    return null;
  };

  const set_user_id = (param) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", param);
    }
    return null;
  };

  const is_token_expired = () => {
    if (typeof window !== "undefined") {
      const expiresAt = localStorage.getItem("expires_at");
      if (!expiresAt) {
        return true;
      }
      return new Date().getTime() > JSON.parse(expiresAt);
    }
    return true;
  };

  const is_user_authenticated = () => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");
      return accessToken !== null && !is_token_expired();
    }
    return false;
  };

  // const getToken = async () => {
  //   try {
  //     const accessToken = await auth0.getTokenSilently();
  //     console.log(accessToken);
  //     return accessToken;
  //   } catch (error: any) {
  //     console.error("Error getting token silently:", error);
  //     if (error?.error === "login_required") {
  //       await auth0.loginWithRedirect();
  //     }
  //     return null;
  //   }
  // };

  return {
    get_user_id,
    handleAuth0Response,
    is_user_authenticated,
    is_token_expired,
    set_user_id,
  };
};
