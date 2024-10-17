export const Detect = (req,res)=>{

    const url = req.body.input; // Destructure input from the request body
   
    
    if (!url) {
   return res.status(400).json({ error: 'Input URL is required' });
    }



    // Your PAT (Personal Access Token) can be found in the Account's Security section
    const PAT = 'c5ee1bce9c524b09901a18432d1ce26e';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = url;

    try{
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                            // "base64": IMAGE_BYTES_STRING
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

       
            fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(result => {
                
                res.json(result);

            })
            .catch(error => {
                res.status(400)
                .json(error);
            } );
        }
        catch(error){
            return 
            res.status(400)
            .json(error);
        }


}