import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { axiosInstance as instance, axiosAuthorization } from "./../api/index";
import { useAtom } from "jotai";
import { notification } from 'antd';
import { socket } from "./../api";
import {
  currentUserAtom,
  isLoggedInAtom,
  permissionsAtom,
  User,
  Permissions
} from "..";
import { API_ENDPOINT } from "..";
import { useRouter } from "next/router";
import { showError } from "../../core-ui/components/Notification";

export function useAuth() {
  const [user, setUser] = useAtom(currentUserAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [permissions, setPermissions] = useAtom(permissionsAtom);

  const router = useRouter();

  useEffect(()=>{
    if(!isLoggedIn){
      let currentUser: User = JSON.parse(localStorage?.getItem("currentUser") || "null")
      const sessionToken = localStorage.getItem("sessionToken");
      if(currentUser){
        let permissions: Permissions = JSON.parse(localStorage?.getItem("permissions") || "null")
        const stateUser: any = currentUser
        socket.updateAuth(sessionToken || currentUser.token.accessToken);
        delete stateUser?.token
        setUser(stateUser);
        setPermissions(permissions)
        setIsLoggedIn(true);
      }
    }
  },[isLoggedIn])

  const updateSession = (updatedUser: User, permission: Permissions): void => {
    localStorage?.setItem("currentUser", JSON.stringify(updatedUser))
    localStorage?.setItem("sessionToken", updatedUser.token.accessToken)
    localStorage?.setItem("refreshToken", updatedUser.token.refreshToken)
    localStorage?.setItem("permissions", JSON.stringify(permission))
    socket.updateAuth(updatedUser.token.accessToken);
    const stateUser: any = updatedUser
    delete stateUser?.token
    setUser(stateUser);
    setPermissions(permission)
    setIsLoggedIn(true);
  };

  const updateProfile = (updatedUser: User): void => {
    localStorage?.setItem("currentUser", JSON.stringify(updatedUser))
    setUser(updatedUser)
  };

  const logOut = async() : Promise<void> => {
    try{
      instance.interceptors.request.use(axiosAuthorization)

      // TODO: Need to implement pushy
      const reqData = {
        device_token:"dasdasdasdasdasd"
      }     
      const response =  await instance.post<Request ,AxiosResponse>(API_ENDPOINT.LOG_OUT,reqData)

      const { data } = response.data
      router.push("/home")
      localStorage?.removeItem("currentUser")
      localStorage?.removeItem("sessionToken")
      localStorage?.removeItem("refreshToken")
      localStorage?.removeItem("permissions")
      localStorage?.removeItem("favoriteSpotPairs")
      localStorage?.removeItem("favoriteFuturePairs")
      setUser(undefined);
      setPermissions(undefined)
      setIsLoggedIn(false);
    }catch(err){
      console.log(err)
    }
    
  }

  const expireSession = (message: any) => {
    if(user){
      router.push("/login")
      localStorage?.removeItem("currentUser")
      localStorage?.removeItem("sessionToken")
      localStorage?.removeItem("refreshToken")
      localStorage?.removeItem("permissions")
      localStorage?.removeItem("favoriteSpotPairs")
      localStorage?.removeItem("favoriteFuturePairs")
      setUser(undefined);
      setPermissions(undefined)
      setIsLoggedIn(false);
      showError("Login Again", message)
    }
  }

  const refreshToken = async() => {
    
    if(!user) {
      logOut()
      return
    }

    let refreshToken = localStorage?.getItem("refreshToken")

    const reqData = {
      id: user.id,
      refreshToken
    }
    
    //use axios instance instead of useHttpPost because otherwise it will cause a loop of hooks
    instance.interceptors.request.use(axiosAuthorization)

    
    try{
      const response =  await instance.post<Request ,AxiosResponse>(API_ENDPOINT.REFRESH_TOKEN,reqData)
      const { data } = response.data
      localStorage?.setItem("sessionToken", data.accessToken)
      localStorage?.setItem("refreshToken", data.refreshToken)
    }catch(err){
      logOut()
      notification.error({
          message: "Oops",
          description: "Token Expired, Login Again",
      });
    }
  };

  return {
    user,
    isLoggedIn,
    permissions,
    updateSession,
    updateProfile,
    refreshToken,
    logOut,
    expireSession,
   };
}
