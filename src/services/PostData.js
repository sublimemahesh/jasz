export function PostData(type, userData) {
//let BaseURL = 'http://localhost/feed_react/src/api/index.php?tp=' + type;
//    let BaseURL = 'http://localhost/galleit/public/api/' + type + '.php';
    let BaseURL = 'https://galleit.synotec.lk/api/' + type + '.php';

    return new Promise((resolve, reject) => {
        console.log(`userData:`, userData);
        fetch(BaseURL,
                {

                    method: 'POST',
                    headers:
                            {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                    body: JSON.stringify(userData)
                })
                .then((response) => response.json()
                            .then((res) => {
                                resolve(res);
                            }))
                .catch((error) => {
                    reject(error);
                });
    });
}