
# PDF Editor

A Web application where we can upload PDF files and create a PDF file out of the selected pages and download that custom PDF file. Each user is able to access their custom PDF file in the application. 



## Tech Stack

**Client:** React, Context API, Bootstrap CSS

**Server:** Node, Express


## Features

- Upload and save PDF files
- Create custom PDF files
- Cross platform


## Screenshots

![App Screenshot](https://i.ibb.co/LYKZ6bn/Screenshot-from-2024-03-22-13-10-58.png)

![App Screenshot](https://i.ibb.co/jh2Df2J/Screenshot-from-2024-03-22-13-06-21.png)

![App Screenshot](https://i.ibb.co/DD3Nckd/Screenshot-from-2024-03-22-13-06-04.png)

![App Screenshot](https://i.ibb.co/jgB77WQ/Screenshot-from-2024-03-22-13-04-49.png)



## Installation

Prerequisites:Node.js, npm or Yarn, MongoDB (if using a local database)

Setting up a directory for the project 

```bash
  mkdir vidyalai
```

Setting up the server using Express-generator 

```bash
  npm install -g express-generator
  cd vidyalai
  express server
```
now we have the server side setup, lets create the client side

```bash
  cd vidyalai
  mkdir client
  cd client
  npm create vite@latest
```
Select React from the given options and you have both the server side folder and client side folder setup.
## Dependencies

### Client-Side Dependencies
The client side of the application, built using React, uses several important libraries:

- React Ecosystem: `react`, `react-dom`, `react-router-dom`
- Utilities: `axios`, `bootstrap`, `react-pdf`, `pdf-lib`
- Development Tools: `@babel/preset-env`, `eslint`, `@vitejs/plugin-react`, `vite`
- Scripts: `dev`, `build`, `lint`, `preview`

### Server-Side Dependencies
The server side, powered by Express.js, incorporates:

- Core Framework: `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `bcryptjs`
- Middleware and Utilities: `cors`, `morgan`, `dotenv`, `multer`, `cookie-parser`, `debug`, `http-errors`
- Scripts: `start`



## Usage/Examples

Below is a snippet from the App component in our client application. This component demonstrates the use of React hooks, navigation, and interaction with our backend to upload and display PDFs.

```javascript
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PdfComp from "./PdfComponent";
import LogoutHeader from "./logoutheader";

function App(){
    const [allImage, setAllImage] = useState(null);
    const navigate = useNavigate();

    // Fetch PDFs on component mount
    useEffect(() => {
        getPdf();
    }, []);

    // Fetch list of PDFs from server
    const getPdf = async () => {
        const result = await axios.get("http://localhost:3000/file/get-files");
        setAllImage(result.data.data);
    };

    // Render the PDF list and provide navigation and upload functionality
    return(
        // ... JSX code here
    );
}

export default App;
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET` = hello

`MONGO_URI` = mongodb+srv://user-name:user-name@cluster0.xq01nz7.mongodb.net/database-name?retryWrites=true&w=majority


## Documentation

[react-pdf](https://github.com/wojtekmaj/react-pdf)


[pdfjs-dist](https://github.com/mozilla/pdf.js/)


[pdf-lib](https://pdf-lib.js.org/)


[blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
## Run Locally

Clone the project

```bash
  git clone git@github.com:arunsankarcm/vidyalai-assessment.git
```

Go to the project directory

```bash
  cd project
```

Install dependencies

```bash
  npm install
```

Start the server for server-side

```bash
  npm  start
```

Start the server for client-side

```bash
  npm run dev  
```

