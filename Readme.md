# Government Invoicing and Billing System :  Cross-Platform Mobile App


## Download App for Android [CLICK HERE](https://expo.dev/artifacts/eas/fvWNV7KR1HQA7Yam35nqDQ.apk)


## Technology Stack

This project leverages the following technologies: React Native, Node.js, Express.js, MongoDB

- **[Invoix](https://expo.dev/artifacts/eas/fvWNV7KR1HQA7Yam35nqDQ.apk):** Leveraged React Native for cross-platform mobile development, with Node.js and Express.js for scalable backend logic and API management, and MongoDB for flexible, secure data storage.


## Tasks Accomplished

- [x] **Task 1:** Security Enhancements: Implement security features in React Native, including data encryption, secure user authentication, and compliance with data protection regulations.
- [x] **Task 2:** Invoice Management: Migrate the invoice creation, tracking, and management features. Ensure the ability to handle multiple line items, taxes, discounts, and notes, with a smooth UI/UX transition.
- [x] **Task 3:** Responsive Mobile UI/UX: Leverage React Native’s capabilities to provide a more responsive and intuitive user experience on both iOS and Android devices, with native-like performance and smoother animations.




## Key Features

- **Feature 1:** Storage : Implemented a feature to save invoices to MongoDB, ensuring secure and persistent storage of all invoice data.
- **Feature 2:** Export functionality : Developed a feature that allows users to export invoices as .txt files, which can then be shared via Gmail, WhatsApp, and other social media platforms.
- **Feature 3:** Dynamic Rows : Enabled users to add or remove rows in the invoice table dynamically, offering flexibility in managing invoice details. 
- **Feature 4:** Encrypted authentication : Created a functional login and registration system, encryption of passwords via bcrypt, providing secure access to the app and ensuring that only authorized users can manage invoices.
- **Feature 5:** User Control and Privacy : Implemented a user control feature where only the creator of an invoice can access it, ensuring the privacy and security of sensitive financial information.
- **Feature 6:** Calculations and Auto-filling : Integrated complex formulas to auto-fill calculable data, making the invoice creation process more user-friendly and efficient.
- **Feature 7:** Invoice Deletion : Added the ability for invoice creators to delete unwanted or incorrect invoices, providing users with better control over their financial records.
- **Feature 8:** Multiple Invoice Formats : Offered two different functional invoice templates, providing users with options to choose the format that best suits their needs.

## Local Setup Instructions 

Follow these steps to run the project locally :

##### Set Up Backend

1. **Clone the Repository**
   ```bash
   git clone https://github.com/devang0707/prod-invoix.git
   cd prod-invoix
   ```
2. **Navigate to 'backend'**
   ```bash
   cd backend
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment variables** Create a .env file in the code/backend directory and add your MongoDB environment variables and Port number 
5. **Run the Backend Server**
   ```bash
   npm start
   ```

#### Set up Frontend

1. **Navigate to 'frontend'**
   ```bash
   cd ../frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Install Expo Go App (SDK 49) in your Android/iOS device from the given link** [CLICK HERE](https://expo.dev/go?sdkVersion=49&platform=android&device=true)

4. **Run the Frontend**
   ```bash
   npx expo start
   ```
5. **Scan the generated QR code via Expo Go app to start the build process**
