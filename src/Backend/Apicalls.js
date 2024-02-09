import { base_url } from "./Base-url"
import { commonapi } from "./Commonapi"


export const registerapi=async(user)=>
{
    return await commonapi('POST',`${base_url}/register`,user,"")
}

export const loginapi=async(user)=>
{
    return await commonapi('POST',`${base_url}/login`,user,"")
}

export const addrecipesapi=async(reqbody,reqheader)=>
{
    return await commonapi("POST",`${base_url}/recipes`,reqbody,reqheader)
}

export const getadminrecipeapi=async()=>
{
    return await commonapi("GET",`${base_url}/recipes/adminrecipes`)
}

export const approverecipeapi = async (recipeId) => {
    return await commonapi("PUT", `${base_url}/recipes/approve/${recipeId}`,{});
  };

export const addtoapproveapi=async(recipeId,reqbody,reqheader)=>
{
    return await commonapi("POST",`${base_url}/recipes/addtoapproved/${recipeId}`,reqbody,reqheader)
}

export const deleteadminrecipes = async (recipeId) => 
{
    return await commonapi("DELETE", `${base_url}/recipes/dltrecipes/${recipeId}`,{});
};

export const addtorejected=async(recipeId,reqbody,reqheader)=>
{
    return await commonapi("POST",`${base_url}/recipes/rejected/${recipeId}`,reqbody,reqheader)
}

export const getapprovedrecipesapi=async()=>
{
    return await commonapi("GET",`${base_url}/recipes/approved`)
}


export const getrejectedapi=async()=>
{
    return await commonapi("GET",`${base_url}/recipes/rejected`)
}
export const getpendingapi=async()=>
{
    return await commonapi("GET",`${base_url}/recipes/pending`)
}
export const getuserrecipesapi=async(userid,reqheader)=>
{
    return await commonapi("GET",`${base_url}/recipes/userrecipes/${userid}`,"",reqheader)
}

export const adminloginapi=async(user)=>
{
    return await commonapi('POST',`${base_url}/admin/login`,user,"")
}

export const usercountapi=async()=>
{
    return await commonapi('GET',`${base_url}/user/count`)
}

export const getrecipecount=async()=>
{
    return await commonapi('GET',`${base_url}/allrecipes`)
}

export const getadmindetailsapi=async()=>
{
    return await commonapi('GET',`${base_url}/admindetails`)
}

export const edituserprofileapi=async(reqbody,reqheader)=>
{
    return await commonapi('PUT',`${base_url}/user/edit`,reqbody,reqheader)
}

export const editadminprofile=async(reqbody,reqheader)=>
{
    return await commonapi('PUT',`${base_url}/admin/edit`,reqbody,reqheader)
}

export const addtosaved=async(recipeId,userid,reqbody,reqheader)=>
{
    return await commonapi("POST",`${base_url}/recipes/addtosaved/${recipeId}/${userid}`,reqbody,reqheader)
}
export const getsavedrecipes=async(userid,reqheader)=>
{
    return await commonapi("GET",`${base_url}/recipes/saved/${userid}`,"",reqheader)
}

export const delteapproved=async(recipeId,reqheader)=>
{
   return await commonapi("DELETE",`${base_url}/recipes/remove/${recipeId}`,{},reqheader)
}