const content = { ["Content-Type"]: "application/json" };
export const useHttp = async ( back_url, method="GET" ,body= null, headers= {} ) => {
    try{
        if (body) {
           body=JSON.stringify(body);
           headers=content;
        }
        const response = await fetch(back_url,{method, body, headers})
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Chto to poshlo ne tak");
        }
        return data;
    } catch (e) {throw e}
};
