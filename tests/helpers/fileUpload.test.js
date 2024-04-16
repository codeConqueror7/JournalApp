import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers"

cloudinary.config({
    cloud_name: 'doq9wht4n',
    api_key: '545666151612762',
    api_secret: 'af6Ic3fgVu1zOIMFZNzDEVGm3jM',
    secure: true
})

describe('first', () => {

    test('debe de suibr el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'https://images.unsplash.com/photo-1653723367970-ae966c1b803e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string')

        // console.log(url)
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1].replace('.jpg', '');
        
        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });
        console.log({cloudResp})
    }),

        test('debe de suibr el archivo correctamente a cloudinary', async () => {

            const file = new File([], 'foto.jpg');

            const url = await fileUpload(file);
            expect(url).toBe(null)
        })
})