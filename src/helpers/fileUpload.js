
export const fileUpload = async (file) => {
    // if (!file) throw Error('alahuackva')
    if ( !file ) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/doq9wht4n/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        console.log(resp)
        if (!resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        // throw new Error(error.message)
        return null
    }

};