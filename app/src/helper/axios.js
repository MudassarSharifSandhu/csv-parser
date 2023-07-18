import axios from 'axios'


export const handleDataEntry = async (vendor,date,file) => {
    try {
        await axios.post(`${process.env.REACT_APP_URL}/dataenty`, { vendor,date,file }, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            console.log("res", res)
        }).catch(err => {
            console.log("err", err)
        })
    } catch (err) {
        console.log("err", err)
    }
}