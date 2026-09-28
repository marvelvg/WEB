  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

            async function receiver() {
                const response = await fetch(apiUrl);
                const data = await response.json();

                console.log(data);
            }

            receiver();