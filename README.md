# Smart Fridge

Smart Fridge is a web application that allows you to monitor your fridge remotely. It provides features such as inventory management and expiration date tracking. This repository contains the code for the Smart Fridge app.

## Installation

To install and run the Smart Fridge app, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/ashikkl/smart-fridge.git
```

2. Navigate to the project directory:

```bash
cd smart-fridge
```

3. Install the dependencies:

```bash
npm install
```

4. Set up Firebase:

- Create a new Firebase project.
- Get the Firebase configuration values.
- Replace the placeholder values in the `.env` file with your Firebase configuration.

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and visit `http://localhost:3000` to access the Smart Fridge app.

## Testing
- Use 'data' as fridge Id and give any fridge name and add it in the fridge selector. Select this to check the web app functionality.

## Features

- Inventory management: Keep track of items in your fridge and their quantities.
- Expiration date tracking: Set expiration dates for items and receive notifications when they are about to expire.
- Real-time updates: Any changes made to the fridge inventory are immediately reflected across all devices.
- User authentication: Securely access your fridge inventory with user authentication powered by Firebase and NextAuth.
- Responsive design: The app is optimized for various screen sizes, allowing you to access it from desktops, tablets, and mobile devices.

## Technologies Used

- Next.js: A React framework for building server-side rendered and static websites.
- Firebase: A cloud-based platform that provides various backend services, including authentication and real-time database.
- NextAuth.js: An authentication library for Next.js applications.
- Tailwind CSS: A utility-first CSS framework for quickly building custom user interfaces.
- Zustand: A small, fast state management library for React.
- axios: A promise-based HTTP client for making API requests.
- date-fns: A JavaScript date utility library for parsing, manipulating, and formatting dates.
- framer-motion: A library for creating smooth animations in React applications.

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## Contact

For any inquiries or questions, please contact me at itsashikkl@gmail.com.

---
