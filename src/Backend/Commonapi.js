import axios from "axios"


export const commonapi=async(httprequest,url,reqbody,reqheader)=>
{
    const reqconfig={
        method:httprequest,
        url,
        data:reqbody,
        headers:reqheader?reqheader:{'Content-Type':'application/json'}
    }
    return await axios(reqconfig).then((result)=>
    {
        return result
    }).catch((err)=>
    {
        return err
    })
}