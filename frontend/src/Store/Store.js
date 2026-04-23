import {create} from "zustand"
import axiosInstance from "../_lib/axiosInstance.js";
import {toast} from "react-hot-toast"

const useAuthStore =create((set,get)=>({
    AuthUser:null,
    isCheckingAuth:true,
    isLoggining:false,
    islogginOut:false,
    isCreatingAccount:false,
    
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/me",{withCredentials:true})
            set({AuthUser:res.data})
            // console.log(res.data)
        } catch (error) {
            set({AuthUser:null})
            // console.log(error)
        } finally{
            set({isCheckingAuth:false})
        }
    },
    Login:async(formData)=>{
        set({isLoggining:true})
        try {
            const res =  await axiosInstance.post("/auth/login",formData,{withCredentials:true})
            set({AuthUser:res.data})
            toast.success("Logged In")
            // console.log(res.data)
        } catch (error) {
            // console.log(error)
            set({AuthUser:null})
            toast.error(error.response?.data?.message)
        }finally{
            set({isLoggining:false})
        }
    },
    Register:async(formData)=>{
        set({isCreatingAccount:true})
        try {
            const res =  await axiosInstance.post("/auth/register",formData,{withCredentials:true})
            set({AuthUser:res.data})
            toast.success("Acccount Created")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message)
        }  finally{
            set({isCreatingAccount:false})
        }

    },
    Logout:async()=>{
        set({islogginOut:true})
        try {
            await axiosInstance.post("/auth/logout",{withCredentials:true})
            set({AuthUser:null})
        } catch (error) {
            console.log(error)
        }
        finally{
            set({islogginOut:false})
        }
    },


    // --------------------------userprofiles-------------------------
    userProfile:null,
    profileId:null,
    isSearchingUserProfile:false,
    Likes:[],
    SearchUserProfile: async (userId) => {
        set({ isSearchingUserProfile: true });
        try {
          const res = await axiosInstance.get(`/auth/user-profile/${userId}`, {
            withCredentials: true,
          });
          set({ userProfile: res.data });
        //   console.log(res.data)
        } catch (error) {
          set({ userProfile: null });
        } finally {
          set({ isSearchingUserProfile: false });
        }
      },
    setProfile:(profileId)=>{
        set({profileId:profileId})
    },
    
    // -------------------Uploads ----------------------------------------
    isUploadingVideo:false,
    videos:[],
    isLoadingVideos:false,
    UploadVideo:async(formData)=>{
        set({isUploadingVideo:true})
        try {
           await axiosInstance.post("/uploads/upload-video", formData, {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              get().AllVideos()
              toast.success("A new Video Uploaded")
        } catch (error) {
            console.log(error)
            toast.success("Some Error Occured while Uploading Video")
        }finally{
            set({isUploadingVideo:false})
        }
    },
    AllVideos:async ()=>{
        set({isLoadingVideos:true})
        try {
            const res =await axiosInstance.get("/uploads/all-videos",{withCredentials:true})
            set({videos:res.data})
        } catch (error) {
            console.log(error)
            set({videos:[]})
        }finally{
            set({isLoadingVideos:false})
        }
    }
    ,DeletePost:async(userId)=>{
        try {
            await axiosInstance.post(`/uploads/delete-video/${userId}`,{withCredentials:true})
            toast.success("Video Deleted")
            get().AllVideos()
        } catch (error) {
            console.log(error)
        }
    },
    Like:async(userId)=>{
        try {
         await axiosInstance.post(`/uploads/like/${userId}`,{withCredentials:true})
         get().AllVideos()
        } catch (error) {
            console.log(error)
        }
    },
    UpdateVideo:async(videoToUpdateId,title,description)=>{
        try {
            await axiosInstance.post(
                `/uploads/update-video/${videoToUpdateId}`,
                { title, description },
                { withCredentials: true }
              );
        } catch (error) {
            console.log(error)
        }
    },
    searchVideo:async(query)=>{
        try {
            const res = await axiosInstance.get("/uploads/search-video", {
                params: { q: query },
                withCredentials: true
            });
            // console.log(res.data)
            return res.data
        } catch (error) {
            // console.log(error)
            return []
        }
    },
    // -----------------Community Users------------------
    Users:[],
    isLoadingCommunityUsers:false,
    CommunityUsers:async()=>{
        set({isLoadingCommunityUsers:true})
        try {
            const res =  await axiosInstance.get("/auth/community-users",{withCredentials:true})
            // console.log(res.data)
            set({Users:res.data})
        } catch (error) {
            
        }finally{
            set({isLoadingCommunityUsers:false})
        }
    },
    // ---------------------------------Comments-------------------------
    Comments:[],
    isPostingComments:false,
    loadingComments:false,
    PostComment: async (text, videoId) => {
        try {
          // Ensure we send a string, not an object!
          await axiosInstance.post(
            "/comments/post-comment",
            { text: String(text), videoId },
            { withCredentials: true }
          );
          toast.success("Comment Added");
          get().AllComments();
        } catch (error) {
          console.log(error);
          toast.error("Failed to post comment");
        }
      },
    AllComments:async()=>{
        set({loadingComments:true})
        try {
            const res = await axiosInstance.get("/comments/allComments",{withCredentials:true})
            set({Comments:res.data})
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }finally{
            set({loadingComments:false})
        }
    },
    DeleteComment:async(CommentId)=>{
        try {
            await axiosInstance.post(`/comments/DeleteComments/${CommentId}`,{withCredentials:true})
            toast.success("Comment Deleted")
            get().AllComments()
        } catch (error) {
            console.log(error)
        }
    },
    UpdateComments:async(CommentId,text)=>{
        try { await axiosInstance.post(`/comments/UpdateComment/${CommentId}`,{text},{withCredentials:true})
            get().AllComments()
        } catch (error) {
           console.log(error) 
        }
    },

    // ------------------Themes---------------
    theme:localStorage.getItem("Theme") || "light",
    seTheme:(theme)=>{
        set({theme:theme})
    localStorage.setItem("Theme",theme)}

}))
export default useAuthStore