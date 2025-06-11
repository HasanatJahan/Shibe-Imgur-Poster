# Imgur Random Shibe Poster

A web application that allows users to automatically post random Shiba Inu pictures to their Imgur account with a single click.

## Features

- Automatic authentication with Imgur API
- Fetches random Shiba Inu images from shibe.online API
- Posts images directly to user's Imgur account
- Automatic token caching for improved performance
- Timestamp-based image titles

## Technical Details

- Built with Node.js
- Uses HTTP/HTTPS modules for API interactions
- Runs on port 3069
- Handles OAuth 2.0 authentication flow with Imgur

## Setup

1. Clone the repository
2. Create an `auth/credentials.json` file with your Imgur API credentials:
```json
{
    "client_id": "YOUR_CLIENT_ID"
}
```
3. Install dependencies
4. Run `node index.js`

## Usage

1. Visit the application in your browser at `http://localhost:3069`
2. Click the button to post a random Shibe image
3. Authenticate with Imgur if required
4. The image will be automatically posted to your Imgur account

## File Structure

```
├── auth/
│   ├── authentication-res.json
│   └── credentials.json
├── html/
│   ├── main.html
│   ├── main_with_alert.html
│   └── receive_code.html
├── images/
├── Sample_files/
└── index.js
```

## Notes

- Authentication tokens are cached to prevent unnecessary re-authentication
- Images are titled with the current timestamp
- The application provides visual feedback upon successful image posting

## Requirements

- Node.js
- Imgur API credentials
- Active internet connection

## License

This project is part of a student assignment (Student ID: 23686488)