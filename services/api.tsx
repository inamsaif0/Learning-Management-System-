const apiUrl='http://192.168.1.4:3000/api';


export default async function postDataToServer(data:object){
    try {
        console.log(data)
    await fetch(apiUrl+'/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
    })
}
    catch(error){
        console.log(error);
        }
    
    

}