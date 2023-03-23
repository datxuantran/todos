// send request to api server
// return error message from the server
const apiRequest = async (url='', objOptions='', errMsg='') => {
    try{
        const response = await fetch(url, objOptions);
        if(!response.ok) throw new Error('Please reload the page')
    }catch(e){
        errMsg = e.message; 
    }finally{
        return errMsg; 
    }
}

export default apiRequest; 